var F,p,T,z,S,G=-1,v=function(n){addEventListener("pageshow",function(t){t.persisted&&(G=t.timeStamp,n(t))},!0)},M=function(){var n=self.performance&&performance.getEntriesByType&&performance.getEntriesByType("navigation")[0];if(n&&n.responseStart>0&&n.responseStart<performance.now())return n},w=function(){var n=M();return n&&n.activationStart||0},s=function(n,t){var r=M(),i="navigate";return G>=0?i="back-forward-cache":r&&(document.prerendering||w()>0?i="prerender":document.wasDiscarded?i="restore":r.type&&(i=r.type.replace(/_/g,"-"))),{name:n,value:t===void 0?-1:t,rating:"good",delta:0,entries:[],id:"v4-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12),navigationType:i}},h=function(n,t,r){try{if(PerformanceObserver.supportedEntryTypes.includes(n)){var i=new PerformanceObserver(function(e){Promise.resolve().then(function(){t(e.getEntries())})});return i.observe(Object.assign({type:n,buffered:!0},r||{})),i}}catch{}},f=function(n,t,r,i){var e,a;return function(c){t.value>=0&&(c||i)&&((a=t.value-(e||0))||e===void 0)&&(e=t.value,t.delta=a,t.rating=function(u,o){return u>o[1]?"poor":u>o[0]?"needs-improvement":"good"}(t.value,r),n(t))}},k=function(n){requestAnimationFrame(function(){return requestAnimationFrame(function(){return n()})})},y=function(n){document.addEventListener("visibilitychange",function(){document.visibilityState==="hidden"&&n()})},I=function(n){var t=!1;return function(){t||(n(),t=!0)}},m=-1,B=function(){return document.visibilityState!=="hidden"||document.prerendering?1/0:0},b=function(n){document.visibilityState==="hidden"&&m>-1&&(m=n.type==="visibilitychange"?n.timeStamp:0,Z())},x=function(){addEventListener("visibilitychange",b,!0),addEventListener("prerenderingchange",b,!0)},Z=function(){removeEventListener("visibilitychange",b,!0),removeEventListener("prerenderingchange",b,!0)},D=function(){return m<0&&(m=B(),x(),v(function(){setTimeout(function(){m=B(),x()},0)})),{get firstHiddenTime(){return m}}},E=function(n){document.prerendering?addEventListener("prerenderingchange",function(){return n()},!0):n()},R=[1800,3e3],$=function(n,t){t=t||{},E(function(){var r,i=D(),e=s("FCP"),a=h("paint",function(c){c.forEach(function(u){u.name==="first-contentful-paint"&&(a.disconnect(),u.startTime<i.firstHiddenTime&&(e.value=Math.max(u.startTime-w(),0),e.entries.push(u),r(!0)))})});a&&(r=f(n,e,R,t.reportAllChanges),v(function(c){e=s("FCP"),r=f(n,e,R,t.reportAllChanges),k(function(){e.value=performance.now()-c.timeStamp,r(!0)})}))})},H=[.1,.25],sn=function(n,t){t=t||{},$(I(function(){var r,i=s("CLS",0),e=0,a=[],c=function(o){o.forEach(function(d){if(!d.hadRecentInput){var X=a[0],Y=a[a.length-1];e&&d.startTime-Y.startTime<1e3&&d.startTime-X.startTime<5e3?(e+=d.value,a.push(d)):(e=d.value,a=[d])}}),e>i.value&&(i.value=e,i.entries=a,r())},u=h("layout-shift",c);u&&(r=f(n,i,H,t.reportAllChanges),y(function(){c(u.takeRecords()),r(!0)}),v(function(){e=0,i=s("CLS",0),r=f(n,i,H,t.reportAllChanges),k(function(){return r()})}),setTimeout(r,0))}))},J=0,P=1/0,C=0,nn=function(n){n.forEach(function(t){t.interactionId&&(P=Math.min(P,t.interactionId),C=Math.max(C,t.interactionId),J=C?(C-P)/7+1:0)})},K=function(){return F?J:performance.interactionCount||0},tn=function(){"interactionCount"in performance||F||(F=h("event",nn,{type:"event",buffered:!0,durationThreshold:0}))},l=[],L=new Map,Q=0,en=function(){var n=Math.min(l.length-1,Math.floor((K()-Q)/50));return l[n]},rn=[],on=function(n){if(rn.forEach(function(e){return e(n)}),n.interactionId||n.entryType==="first-input"){var t=l[l.length-1],r=L.get(n.interactionId);if(r||l.length<10||n.duration>t.latency){if(r)n.duration>r.latency?(r.entries=[n],r.latency=n.duration):n.duration===r.latency&&n.startTime===r.entries[0].startTime&&r.entries.push(n);else{var i={id:n.interactionId,latency:n.duration,entries:[n]};L.set(i.id,i),l.push(i)}l.sort(function(e,a){return a.latency-e.latency}),l.length>10&&l.splice(10).forEach(function(e){return L.delete(e.id)})}}},U=function(n){var t=self.requestIdleCallback||self.setTimeout,r=-1;return n=I(n),document.visibilityState==="hidden"?n():(r=t(n),y(n)),r},N=[200,500],fn=function(n,t){"PerformanceEventTiming"in self&&"interactionId"in PerformanceEventTiming.prototype&&(t=t||{},E(function(){var r;tn();var i,e=s("INP"),a=function(u){U(function(){u.forEach(on);var o=en();o&&o.latency!==e.value&&(e.value=o.latency,e.entries=o.entries,i())})},c=h("event",a,{durationThreshold:(r=t.durationThreshold)!==null&&r!==void 0?r:40});i=f(n,e,N,t.reportAllChanges),c&&(c.observe({type:"first-input",buffered:!0}),y(function(){a(c.takeRecords()),i(!0)}),v(function(){Q=K(),l.length=0,L.clear(),e=s("INP"),i=f(n,e,N,t.reportAllChanges)}))}))},q=[2500,4e3],A={},dn=function(n,t){t=t||{},E(function(){var r,i=D(),e=s("LCP"),a=function(o){t.reportAllChanges||(o=o.slice(-1)),o.forEach(function(d){d.startTime<i.firstHiddenTime&&(e.value=Math.max(d.startTime-w(),0),e.entries=[d],r())})},c=h("largest-contentful-paint",a);if(c){r=f(n,e,q,t.reportAllChanges);var u=I(function(){A[e.id]||(a(c.takeRecords()),c.disconnect(),A[e.id]=!0,r(!0))});["keydown","click"].forEach(function(o){addEventListener(o,function(){return U(u)},{once:!0,capture:!0})}),y(u),v(function(o){e=s("LCP"),r=f(n,e,q,t.reportAllChanges),k(function(){e.value=performance.now()-o.timeStamp,A[e.id]=!0,r(!0)})})}})},O=[800,1800],an=function n(t){document.prerendering?E(function(){return n(t)}):document.readyState!=="complete"?addEventListener("load",function(){return n(t)},!0):setTimeout(t,0)},ln=function(n,t){t=t||{};var r=s("TTFB"),i=f(n,r,O,t.reportAllChanges);an(function(){var e=M();e&&(r.value=Math.max(e.responseStart-w(),0),r.entries=[e],i(!0),v(function(){r=s("TTFB",0),(i=f(n,r,O,t.reportAllChanges))(!0)}))})},g={passive:!0,capture:!0},cn=new Date,j=function(n,t){p||(p=t,T=n,z=new Date,W(removeEventListener),V())},V=function(){if(T>=0&&T<z-cn){var n={entryType:"first-input",name:p.type,target:p.target,cancelable:p.cancelable,startTime:p.timeStamp,processingStart:p.timeStamp+T};S.forEach(function(t){t(n)}),S=[]}},un=function(n){if(n.cancelable){var t=(n.timeStamp>1e12?new Date:performance.now())-n.timeStamp;n.type=="pointerdown"?function(r,i){var e=function(){j(r,i),c()},a=function(){c()},c=function(){removeEventListener("pointerup",e,g),removeEventListener("pointercancel",a,g)};addEventListener("pointerup",e,g),addEventListener("pointercancel",a,g)}(t,n):j(t,n)}},W=function(n){["mousedown","keydown","touchstart","pointerdown"].forEach(function(t){return n(t,un,g)})},_=[100,300],pn=function(n,t){t=t||{},E(function(){var r,i=D(),e=s("FID"),a=function(o){o.startTime<i.firstHiddenTime&&(e.value=o.processingStart-o.startTime,e.entries.push(o),r(!0))},c=function(o){o.forEach(a)},u=h("first-input",c);r=f(n,e,_,t.reportAllChanges),u&&(y(I(function(){c(u.takeRecords()),u.disconnect()})),v(function(){var o;e=s("FID"),r=f(n,e,_,t.reportAllChanges),S=[],T=-1,p=null,W(addEventListener),o=a,S.push(o),V()}))})};export{H as CLSThresholds,R as FCPThresholds,_ as FIDThresholds,N as INPThresholds,q as LCPThresholds,O as TTFBThresholds,sn as onCLS,$ as onFCP,pn as onFID,fn as onINP,dn as onLCP,ln as onTTFB};
