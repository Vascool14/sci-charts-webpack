export default function turnCSVToObject(csv: string): any {
    const [header, ...rows] = csv.split('\n').map(row => row.split(','));

    const DATA: {[key: string]:{ xValues: number[], yValues: number[][] }} = {};
    
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const country = row[0].trim();
        const year = parseInt(row[2].trim());

        // Extract patent data and replace empty strings with 0
        const patents = row.slice(3).map(patent => patent.trim() === '' ? 0 : parseInt(patent.trim()));

        if (!DATA[country]) {
            DATA[country] = {
                xValues: [],
                yValues: [[], [], [], [], []]
            }
        }

        DATA[country].xValues.push(year);

        // Push each patent data to its respective array
        for (let j = 0; j < patents.length; j++) {
            DATA[country].yValues[j].push(patents[j]);
        }
    }
    
    return DATA;
}