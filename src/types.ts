export interface StateInterface {
    theme: string,
    DATA: DataInterface,
    allOptions: string[],
    selectedOption: string,
    selectedYear: number,
}

export interface DataInterface {
    [key: string]: { xValues: number[], yValues: number[][] }
}

export interface ContextInterface {
    state: StateInterface,
    setState: React.Dispatch<React.SetStateAction<StateInterface>>
}