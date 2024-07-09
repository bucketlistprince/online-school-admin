export async function fetchData(endpoint) {
    const response = await fetch(`/api/${endpoint}`);
    const data = await response.json();
    return data;
  }
  