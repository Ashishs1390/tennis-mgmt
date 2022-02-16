console.log('%c ------------=-------------=--------------=-------------+------------=-------------=--------------=-------------+------------=-------------=--------------=-------------', 'font-size:16px;text-align:center;background:#0f0;color: #0f0');

console.log('%cUse %cbelow %ccommands', 'color:#f00;font-size:24px', 'color:#0f0;font-size:24px', 'color:#00f;font-size:24px');
const commands = [{
    command: 'ass()',
    decription: 'For random assessment'
}];
console.table(commands);
console.log('%c ------------=-------------=--------------=-------------+------------=-------------=--------------=-------------+------------=-------------=--------------=-------------', 'font-size:16px;text-align:center;background:#0f0;color: #0f0');

window.ass = function() {
    [...document.querySelectorAll('#CompetancyDetails > div')].filter((x, i) => ( i != 0 && x)).forEach(x => {
        const h = [...x.querySelectorAll('.MuiListItemSecondaryAction-root')];
        h.forEach(x => {
        const f = x.querySelectorAll('Button')[Math.floor((Math.random() * 9) +1)];
        console.log(f.click())
    })
    })
}