const D = require('diff');
const { globSync: gs } = require('glob');
const { readFileSync: rfs } = require('fs');
const { resolve: rv } = require('path');

const s = (s, t) => `\x1b[${s}m${t}\x1b[0;0m`;
const rf = n => rfs(n).toString('utf-8');
const rph = rv(__dirname, './raw');
for (const oph of gs(rph + '/**/*.js')) {
  const name = oph.replace(rph, '');
  const dl = D.diffLines(rf(oph), rf(rv(__dirname, './dist' + name)));
  if (!dl.some(p => p.added || p.removed)) continue;
  console.log(s('1', name + '\n'));
  dl.forEach(({ added: a, removed: r, value: v, count: L }) => {
    const l = v.split('\n');
    const p = (a, b = L) => l.slice(a >= 0 ? a : L + a, b).join('\n');
    const text = a || r || L <= 10 ? v : p(0, 5) + s('0;36', '\n/-/-/\n') + p(-5);
    console.log(s(`0;${a ? '32' : r ? '31' : '0'}`, text));
  });
}
