export async function submit_text(){
    let form_data = new FormData();

    form_data.append("text", "Tanguy");

    const response = await fetch('http://127.0.0.1:5000/submit/text',  {
        method: 'POST',
        body: form_data,
    });

    const noise = await response.json();
    
    return noise;
}