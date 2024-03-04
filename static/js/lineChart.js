/*
    Demonstrate how to create a line chart
*/

async function getData(){
    const response = await fetch('../data/data.csv'); //.. moves up one folder
    const data = await response.text(); //csv is in text format
    // console.log(data);

    const xIterations = []; //x-axis labels = iteration values 
    const yVolunteer = []; //fy-axis volunteer values
    const yUnsupervised = []; //y-axis unsupervised temps
    const ySupervised = []; //y-axis self supervised temps

    // \n is new line
    // split ('\n') will seperate table into array of indv. rows
    //slice(start, end) - return new array starting at index start that will go up to, 
    //but not including index end.
    const table = data.split('\n').slice(1);
    //console.log(table);

    table.forEach(row => {
        const columns = row.split(','); //split each row on the commas
        const year = columns[0]; //assign iteration value to variable year
        xIterations.push(year); 
        
        const temp = parseFloat(columns[1]); //assign temp values
        yVolunteer.push(temp);

        const nhTemp = parseFloat(columns[2]);  //n. hemisphere temp deviation values
        yUnsupervised.push(nhTemp);

        const shTemp = parseFloat(columns[3]); //s. hemisphere temp deviation values
        ySupervised.push(shTemp);

        
    });
    console.log(yVolunteer, yUnsupervised, ySupervised);
    return{xIterations, yVolunteer, yUnsupervised, ySupervised}
}

//getData();

async function createChart(){
    const data = await getData(); //createChart will wait until getData() is finished processing
    const ctx = document.getElementById('myChart');
    const degSym = String.fromCharCode(176);
    const myChart = new Chart(ctx, {
        type: 'line', 
        data: {
            labels: data.xIterations,
            datasets: [
                {
                    label: `Volunteer Identification Method`,
                    data: data.yVolunteer, 
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: `Unsupervised Learning Identification Method`,
                    data: data.yUnsupervised, 
                    fill: false,
                    backgroundColor: 'rgba(0, 102, 255, 0.2)',
                    borderColor: 'rgba(0, 102, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: `Self-Supervised Learning Identification Method`,
                    data: data.ySupervised, 
                    fill: false,
                    backgroundColor: 'rgba(0, 153, 51, 0.2)',
                    borderColor: 'rgba(0, 153, 51, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true, //Resize based on screen size
            scales: { //Display options for x and y axis
                x: {
                    title: {
                        display: true,
                        text: 'Number of CNN Iterations',
                        font: {
                            size: 20
                        },
                    },
                    ticks: {
                        callback: function(val, index){
                            //Labeling of tick marks can be controlled by code and font size
                            return index % 2 === 0 ? this.getLabelForValue(val) : '';
                        },
                        font: {
                            size: 14
                        }
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Number of Correctly Identified Galaxy Mergers',
                        font: {
                            size: 20
                        },
                    },
                    ticks: {
                        maxTicksLimit: data.yVolunteer.length/2, //limit # of ticks
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: { //display options
                title: {
                    display: true,
                    text: 'Number of Correctly Identified Galaxy Mergers vs Number of CNN Iterations',
                    font: {
                        size: 20
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'start',
                    position: 'bottom'
                }
            }
        }
    });
}

createChart();