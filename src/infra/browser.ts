import puppeteer from 'puppeteer';

export async function browser() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const pill = await page.$$('.notion-pill')
    for (let element of pill) {
        const elementProperty = await element.getProperty('innerHTML');
        const innerHtml = await elementProperty.jsonValue();
        console.log(innerHtml)
    }
}

export async function example() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://developers.google.com/web/');

    // Type into search box.
    await page.type('.devsite-search-field', 'Headless Chrome');

    // Wait for suggest overlay to appear and click "show all results".
    const allResultsSelector = '.devsite-suggest-all-results';
    await page.waitForSelector(allResultsSelector);
    await page.click(allResultsSelector);

    // Wait for the results page to load and display the results.
    const resultsSelector = '.gsc-results .gs-title';
    await page.waitForSelector(resultsSelector);

    // Extract the results from the page.
    const links = await page.evaluate(resultsSelector => {
        return [...document.querySelectorAll(resultsSelector)].map((anchor: HTMLAnchorElement) => {
            const title = anchor.textContent.split('|')[0].trim();
            return `${title} - ${anchor.href}`;
        });
    }, resultsSelector);

    // Print all the files.
    console.log(links.join('\n'));

    await browser.close();
}