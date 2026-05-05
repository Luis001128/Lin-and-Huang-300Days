const apiKey = "sk-eupdwdrcxnrzudvgktgfumwrrtjtspzmqetxbuberhtazkhk";

async function test() {
  const response = await fetch('https://api.siliconflow.cn/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'stabilityai/stable-diffusion-3-5-large',
      prompt: 'test',
      image_size: '1024x1024'
    })
  });
  
  const text = await response.text();
  console.log(`Status: ${response.status}`);
  console.log(`Body: ${text}`);
}

test();
