const arr1=[3, 'a', 'a', 'a', 2, 3, 'a', 3, 'a', 2, 4, 9];

mostFreq(arr1);

function mostFreq(arr)
{
    arr.sort();

    let max = 0;
    let count = 1;
    let mostFreq = null;

    for(let i = 0; i < arr.length; i++)
    {
        if(arr[i] === arr[i + 1])
        {
            count++;
        }

        if(count > max)
        {
            max = count;
            mostFreq = arr[i];
        }

        if(arr[i] !== arr[i+1])
        {
            count = 1;
        }
    }

    console.log(mostFreq + " ( " + max + " times )");
}