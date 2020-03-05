import { createElement as v$1, Fragment as d, options as n$1 } from './preact.js';

var n=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i,o=function(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},a=function(e,t){return String(e).replace(/(\n+)/g,"$1"+(t||"\t"))},i=function(e,t,r){return String(e).length>(t||40)||!r&&-1!==String(e).indexOf("\n")||-1!==String(e).indexOf("<")},l={};function s(e){var t="";for(var r in e){var o=e[r];null!=o&&(t&&(t+=" "),t+=l[r]||(l[r]=r.replace(/([A-Z])/g,"-$1").toLowerCase()),t+=": ",t+=o,"number"==typeof o&&!1===n.test(r)&&(t+="px"),t+=";");}return t||void 0}function p(e,t){for(var r in t)e[r]=t[r];return e}function c(e,t){return Array.isArray(t)?t.reduce(c,e):null!=t&&!1!==t&&e.push(t),e}var f={shallow:!0},u=[],g=/^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;v.render=v;var _=function(e,t){return v(e,t,f)};function v(n,l,f,_,h,d$1){if(null==n||"boolean"==typeof n)return "";Array.isArray(n)&&(n=v$1(d,null,n));var m=n.type,x=n.props,y=!1;l=l||{};var b,S=(f=f||{}).pretty,w=S&&"string"==typeof S?S:"\t";if("object"!=typeof n&&!m)return o(n);if("function"==typeof m){if(y=!0,!f.shallow||!_&&!1!==f.renderRootComponent){if(m===d){var k="",O=[];c(O,n.props.children);for(var C=0;C<O.length;C++)k+=(C>0&&S?"\n":"")+v(O[C],l,f,!1!==f.shallowHighOrder,h,d$1);return k}var A,H=n.__c={__v:n,context:l,props:n.props,__h:[]};if(n$1.__r&&n$1.__r(n),m.prototype&&"function"==typeof m.prototype.render){var j=m.contextType,$=j&&l[j.__c],F=null!=j?$?$.props.value:j.__:l;(H=n.__c=new m(x,F)).__v=n,H._dirty=H.__d=!0,H.props=x,null==H.state&&(H.state={}),null==H._nextState&&null==H.__s&&(H._nextState=H.__s=H.state),H.context=F,m.getDerivedStateFromProps?H.state=p(p({},H.state),m.getDerivedStateFromProps(H.props,H.state)):H.componentWillMount&&H.componentWillMount(),H.state=H._nextState!==H.state?H._nextState:H.__s!==H.state?H.__s:H.state,A=H.render(H.props,H.state,H.context);}else{var L=m.contextType,M=L&&l[L.__c];A=m.call(n.__c,x,null!=L?M?M.props.value:L.__:l);}return H.getChildContext&&(l=p(p({},l),H.getChildContext())),v(A,l,f,!1!==f.shallowHighOrder,h,d$1)}m=(b=m).displayName||b!==Function&&b.name||function(e){var t=(Function.prototype.toString.call(e).match(/^\s*function\s+([^( ]+)/)||"")[1];if(!t){for(var r=-1,n=u.length;n--;)if(u[n]===e){r=n;break}r<0&&(r=u.push(e)-1),t="UnnamedComponent"+r;}return t}(b);}var T,D="";if(x){var N=Object.keys(x);f&&!0===f.sortAttributes&&N.sort();for(var P=0;P<N.length;P++){var R=N[P],W=x[R];if("children"!==R&&(!R.match(/[\s\n\\/='"\0<>]/)&&(f&&f.allAttributes||"key"!==R&&"ref"!==R))){if("className"===R){if(x.class)continue;R="class";}else h&&R.match(/^xlink:?./)&&(R=R.toLowerCase().replace(/^xlink:?/,"xlink:"));"style"===R&&W&&"object"==typeof W&&(W=s(W));var q=f.attributeHook&&f.attributeHook(R,W,l,f,y);if(q||""===q)D+=q;else if("dangerouslySetInnerHTML"===R)T=W&&W.__html;else if((W||0===W||""===W)&&"function"!=typeof W){if(!(!0!==W&&""!==W||(W=R,f&&f.xml))){D+=" "+R;continue}if("value"===R){if("select"===m){d$1=W;continue}"option"===m&&d$1==W&&(D+=" selected");}D+=" "+R+'="'+o(W)+'"';}}}}if(S){var z=D.replace(/^\n\s*/," ");z===D||~z.indexOf("\n")?S&&~D.indexOf("\n")&&(D+="\n"):D=z;}if(D="<"+m+D+">",String(m).match(/[\s\n\\/='"\0<>]/))throw new Error(m+" is not a valid HTML tag name in "+D);var E=String(m).match(g);E&&(D=D.replace(/>$/," />"));var I,U=[];if(T)S&&i(T)&&(T="\n"+w+a(T,w)),D+=T;else if(x&&c(I=[],x.children).length){for(var Z=S&&~D.indexOf("\n"),B=!1,G=0;G<I.length;G++){var J=I[G];if(null!=J&&!1!==J){var K=v(J,l,f,!0,"svg"===m||"foreignObject"!==m&&h,d$1);if(S&&!Z&&i(K)&&(Z=!0),K)if(S){var Q=K.length>0&&"<"!=K[0];B&&Q?U[U.length-1]+=K:U.push(K),B=Q;}else U.push(K);}}if(S&&Z)for(var V=U.length;V--;)U[V]="\n"+w+a(U[V],w);}if(U.length)D+=U.join("");else if(f&&f.xml)return D.substring(0,D.length-1)+" />";return E||(S&&~D.indexOf("\n")&&(D+="\n"),D+="</"+m+">"),D}v.shallowRender=_;

export default v;
export { v as render, v as renderToString, _ as shallowRender };
//# sourceMappingURL=preact-render-to-string.js.map
