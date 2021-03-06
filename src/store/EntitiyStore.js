export const getEntities = async () => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://6y458uslg3.execute-api.eu-west-3.amazonaws.com/elixos/entities';

    const response = await fetch(proxyUrl + targetUrl);
    if (response.status < 300 && response.status >= 200) return (await response.json()).entities;
    return null;
};
