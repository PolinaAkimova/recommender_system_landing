
async function getData(url) {
    let response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Couldn't fetch URL ${url}`);
    }

    return await response.json();
}

async function sendData(url, data) {
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data,
    });

    return await response.json();
}

export { getData, sendData }