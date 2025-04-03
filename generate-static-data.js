fetch('./knowledge-base.json')
  .then(response => response.json())
  .then(data => {
    const flatData = [];

    if (!Array.isArray(data.vendors)) {
      console.error("Invalid format: 'vendors' should be an array.");
      return;
    }

    data.vendors.forEach(vendor => {
      const title = vendor.name || "Untitled";
      const content = `
        Source File: ${vendor.source_file || ""}
        Contact: ${vendor.contact?.primary || "Unknown"} (${vendor.contact?.email || "unknown@example.com"})
        Keywords: ${vendor.keywords?.join(', ') || ""}
        Notes: ${vendor.notes?.join(', ') || ""}
      `.trim();

      flatData.push({ title, content });
    });

    // Save to static-data.json (for local use, or copy into your repo manually)
    const blob = new Blob([JSON.stringify(flatData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'static-data.json';
    link.click();
  })
  .catch(err => console.error("Error loading knowledge-base.json:", err));
