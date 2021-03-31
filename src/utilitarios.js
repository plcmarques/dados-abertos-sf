export function quebraTexto(param){
    let arrayPesquisa = param.split(" ");
    let arrayPesquisa2 = [];
    arrayPesquisa.forEach((item) => {
        if(item.indexOf("/") > -1){
            let arrayTemp = item.split("/");
            arrayTemp.forEach((tempItem) => {
                arrayPesquisa2.push(tempItem)
            })
        } else{
            arrayPesquisa2.push(item);
        }
    })

    return arrayPesquisa2;
}