export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function dateToString(date: Date): string {
    const year: string = date.getFullYear().toString();
    const month: string = (date.getMonth() + 1).toString().padStart(2, "0");
    const day: string = date.getDate().toString().padStart(2, "0");
    return `${month}-${day}-${year}`;
}