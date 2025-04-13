const performCalculations = async () => {
    
    const data = await new Promise((resolve) => {
        setTimeout(() => resolve('данные'), 1000);
    });
    
    const result = `Обработанные ${data}`;

    console.log('Отправка результата в основной поток:', result);
};

await performCalculations();