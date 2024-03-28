export default function turnCSVToObject(csv: string): any {
    // 1 Entity,
    // 2 Code,
    // 3 Year,
    // 4 Number of patents in electric vehicle machine technology,
    // 5 Number of patents in electric vehicle storage,
    // 6 Number of patents in electric vehicle management,
    // 7 Number of patents in electric vehicle communication technology,
    // 8 Number of patents in electric vehicle charging stations

    // EXAMPLE:
    // Africa,,2001,3,,3,1,2
    // Africa,,2003,1,2,1,,
    // Romania,,2001,3,4,2,1,4

    const [ header, ...rows ] = csv.split('\n').map(row => row.split(','));
    
    // we dont need the first column
    // wanted output:
    // {
    // "Africa" = {
    //     const xValues = [2001, 2003];
    //     const yValues = [
    //         [3,1],
    //         [null,2],
    //         [3,1],
    //         [2,null]
    //     ]
    // },
    // "Romania" = {
    //     const xValues = [2001];
    //     const yValues = [
    //         [3,4],
    //         [4,2],
    //         [2,1],
    //         [1,4]
    //     ]
    // }

    const DATA: { [key: string]: { xValues: string[], yValues: string[][] } } = {};

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const country = row[0];
        const year = row[2];
        const patents = row.slice(3);

        if (!DATA[country]) {
            DATA[country] = {
                xValues: [],
                yValues: []
            }
        }

        DATA[country].xValues.push(year);
        DATA[country].yValues.push(patents);
    }
    console.log(DATA);
    
    return DATA;
}