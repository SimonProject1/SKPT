#!/usr/bin/env node
'use strict';
const fs=require('fs');const vm=require('vm');const path=require('path');
const ROOT=path.resolve(__dirname,'..');
function baseContext(){
  const context={console,URL,Number,Intl,Math,JSON,Array,String,RegExp,Object,Error,setTimeout:()=>0,clearTimeout:()=>{},location:{href:'http://localhost/',pathname:'/'},navigator:{},Event:function(type,options){this.type=type;Object.assign(this,options||{})}};
  context.window=context;
  context.document={currentScript:{src:'http://localhost/assets/app.js'},readyState:'loading',addEventListener:()=>{},querySelectorAll:()=>[],getElementById:()=>null,body:{dataset:{}}};
  vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(ROOT,'assets/app.js'),'utf8'),context,{filename:'assets/app.js'});return context;
}
function inlineScript(file,needle){const html=fs.readFileSync(path.join(ROOT,file),'utf8'),scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(match=>match[1]);const found=scripts.find(text=>text.includes(needle));if(!found)throw new Error(`Inline-Skript nicht gefunden: ${file}`);return found}
function assertEqual(actual,expected,label){if(actual!==expected)throw new Error(`${label}: erwartet ${expected}, erhalten ${actual}`);console.log(`OK ${label}: ${actual}`)}
function runInline(file,needle,values,assertions,setup){const context=baseContext();Object.assign(context,values);if(setup)setup(context);vm.runInContext(inlineScript(file,needle),context,{filename:file});for(const [key,expected] of Object.entries(assertions))assertEqual(context[key].textContent,expected,`${file} ${key}`)}
runInline('analogsignal/index.html','function calc()',{
 p0:{value:'0'},p1:{value:'100'},s0:{value:'4'},s1:{value:'20'},dir:{value:'ps'},x:{value:'50'},out:{textContent:''},pct:{textContent:''}
},{out:'12,000 mA',pct:'50,0 %'});
runInline('pf-rechner/index.html','function calc()',{
 x1:{value:'0'},y1:{value:'4'},x2:{value:'100'},y2:{value:'20'},k:{textContent:''},n:{textContent:''}
},{k:'0,160000',n:'4,000000'});
runInline('pt-rechner/index.html','function r(t,r0)',{
 sensor:{value:'100'},dir:{value:'tr'},x:{value:'0'},out:{textContent:''}
},{out:'100,000 Ω'});
{
 const context=baseContext();
 function select(){let options=[];let index=0;const object={oninput:null,onchange:null};Object.defineProperty(object,'innerHTML',{set(value){options=[...String(value).matchAll(/<option>(.*?)<\/option>/g)].map(match=>match[1]);index=0}});Object.defineProperty(object,'selectedIndex',{set(value){index=value}});Object.defineProperty(object,'value',{get(){return options[index]||''},set(value){const found=options.indexOf(value);if(found>=0)index=found}});return object}
 Object.assign(context,{cat:{value:'Druck'},from:select(),to:select(),x:{value:'1'},out:{textContent:''}});
 vm.runInContext(inlineScript('einheitenrechner/index.html','const U='),context,{filename:'einheitenrechner/index.html'});
 assertEqual(context.out.textContent,'1.000,000 mbar','Einheitenrechner 1 bar in mbar');
}
{
 const elements={system:{value:'three'},voltagePreset:{value:'400'},customVoltage:{value:'500'},customVoltageLabel:{hidden:true},current:{value:'16',addEventListener:()=>{}},length:{value:'35',addEventListener:()=>{}},area:{value:'2.5'},material:{value:'56'},cosphi:{value:'1.00',addEventListener:()=>{}},limit:{value:'6.0',addEventListener:()=>{}},calculate:{},reset:{},result:{hidden:true,scrollIntoView:()=>{}},statusBadge:{className:'',textContent:''},dropV:{textContent:''},dropPercent:{textContent:''},loadVoltage:{textContent:''},permittedV:{textContent:''},reserve:{textContent:''},protocolV:{textContent:''},protocolPercent:{textContent:''},formula:{textContent:''}};
 const context={console,Math,Number,Intl,Array,String,document:{readyState:'complete',getElementById:id=>elements[id],querySelectorAll:selector=>selector==='input'?[elements.current,elements.length,elements.cosphi,elements.limit]:[]},alert:message=>{throw new Error(message)}};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(ROOT,'spannungsfall-rechner/calculator.js'),'utf8'),context,{filename:'calculator.js'});elements.calculate.onclick();
 assertEqual(elements.dropV.textContent,'6,93 V','Spannungsfall ΔU');assertEqual(elements.dropPercent.textContent,'1,73 %','Spannungsfall Prozent');assertEqual(elements.loadVoltage.textContent,'393,07 V','Spannungsfall Lastspannung');assertEqual(elements.reserve.textContent,'+17,07 V','Spannungsfall Reserve');
}
console.log('OK: Rechner-Smoke-Tests abgeschlossen.');
