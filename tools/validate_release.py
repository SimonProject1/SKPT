#!/usr/bin/env python3
"""Static release validation for SK PLT Tools 2.0.0.0."""
from pathlib import Path
from bs4 import BeautifulSoup
import re, subprocess, sys

ROOT=Path(__file__).resolve().parents[1]
VERSION='2.0.0.0'
EXPECTED_PAGES={
 'index.html','analogsignal/index.html','einheitenrechner/index.html','messstellen-doku/index.html',
 'pf-rechner/index.html','pt-rechner/index.html','servicewerte/index.html',
 'spannungsfall-rechner/index.html','plausibilitaetspruefung-vde0100-600/index.html',
 'wissensdatenbank/index.html','wissensdatenbank/air-torque-antrieb-drehrichtung/index.html',
 'wissensdatenbank/siemens-sitrans-p320-sil-verriegelung/index.html'
}
errors=[]
pages={p.relative_to(ROOT).as_posix():p for p in ROOT.rglob('index.html')}
if set(pages)!=EXPECTED_PAGES:
    errors.append(f'HTML-Seiten abweichend: erwartet {sorted(EXPECTED_PAGES)}, gefunden {sorted(pages)}')

def resolve_local(page,ref):
    clean=ref.split('#',1)[0].split('?',1)[0]
    if not clean or clean.startswith(('http://','https://','mailto:','data:','javascript:','#')): return None
    path=(page.parent/clean).resolve()
    try: path.relative_to(ROOT.resolve())
    except ValueError:
        errors.append(f'{page.relative_to(ROOT)}: Referenz verlässt Paket: {ref}');return None
    if clean.endswith('/'): path=path/'index.html'
    return path

for rel,page in pages.items():
    text=page.read_text(encoding='utf-8')
    soup=BeautifulSoup(text,'html.parser')
    if soup.body is None or soup.head is None: errors.append(f'{rel}: head/body fehlt');continue
    if soup.body.get('data-sk-version')!=VERSION: errors.append(f'{rel}: data-sk-version fehlt/falsch')
    if len(soup.select('header.sk-header-normalized'))!=1: errors.append(f'{rel}: genau ein statischer Header erwartet')
    if len(soup.select('footer.sk-footer'))!=1: errors.append(f'{rel}: genau ein statischer Footer erwartet')
    if len(soup.select('.sk-logo-version'))!=1 or soup.select_one('.sk-logo-version').get_text(strip=True)!=f'Version {VERSION}': errors.append(f'{rel}: Header-Version falsch')
    if f'Version {VERSION}' not in soup.select_one('footer.sk-footer').get_text(' ',strip=True): errors.append(f'{rel}: Footer-Version falsch')
    styles=[tag.get('href','') for tag in soup.find_all('link',rel=lambda value:value and 'stylesheet' in value)]
    if not any('assets/styles.css' in value for value in styles): errors.append(f'{rel}: styles.css fehlt')
    if not any('assets/design.css' in value for value in styles): errors.append(f'{rel}: design.css fehlt')
    scripts=[tag.get('src','') for tag in soup.find_all('script',src=True)]
    for required in ('app.js','favorites.js','start-filter.js','sort-tools.js','navigation-tree.js'):
        if not any(required in value for value in scripts): errors.append(f'{rel}: direkt eingebundenes Modul fehlt: {required}')
    for forbidden in ('sk-shell.js','header-alignment-fix.js','header-version-footer-fix.js','card-cleanup.js','start-vde-integration.js','start-voltage-drop-integration.js','version-1.9.8.5.js'):
        if any(forbidden in value for value in scripts): errors.append(f'{rel}: alte Patchdatei noch eingebunden: {forbidden}')
    if len(soup.select('.sk-favorites-trigger'))!=1 or len(soup.select('.sk-tree-trigger'))!=1: errors.append(f'{rel}: statische Seitentrigger fehlen')
    for tag in soup.find_all(src=True)+soup.find_all(href=True):
        ref=tag.get('src') or tag.get('href')
        target=resolve_local(page,ref)
        if target is not None and not target.exists(): errors.append(f'{rel}: fehlende lokale Referenz {ref}')

start=BeautifulSoup((ROOT/'index.html').read_text(encoding='utf-8'),'html.parser')
if len(start.select('.tools > a.card'))!=8: errors.append('Startseite: genau 8 sichtbare Werkzeugkacheln erwartet')
if start.select('a[href*="servicewerte"]'): errors.append('Startseite: entfernte Service-Kachel ist noch verlinkt')
if not start.select_one('#skToolFilter #skToolSort'): errors.append('Startseite: Filter/Sortierung nicht statisch vorhanden')

sw=(ROOT/'service-worker.js').read_text(encoding='utf-8')
for forbidden in ('enhanceHtml','enhanceJs','.replace(\'</head>\'','.replace(\'</body>\''):
    if forbidden in sw: errors.append(f'Service Worker enthält verbotene Laufzeit-Patchlogik: {forbidden}')
if f"const RELEASE='{VERSION}'" not in sw: errors.append('Service Worker verwendet falsche Version')

for script in ROOT.rglob('*.js'):
    result=subprocess.run(['node','--check',str(script)],capture_output=True,text=True)
    if result.returncode: errors.append(f'{script.relative_to(ROOT)}: JS-Syntaxfehler: {result.stderr.strip()}')

if errors:
    print('FEHLER')
    for error in errors: print('-',error)
    sys.exit(1)
print(f'OK: {len(pages)} Seiten, 8 Startseitenkacheln, lokale Referenzen und JavaScript geprüft.')
