export default function getTextByRows(items){
     const rows = [];

    const sorted = items;

    for (const item of sorted) {
      let existingRow = rows.find(
        (row) => row.page === item.page && Math.abs(row.y - item.y) < 5,
      );

      if (!existingRow) {
        existingRow = {
          page: item.page,
          y: item.y,
          items: [],
        };

        rows.push(existingRow);
      }

      existingRow.items.push(item);
    }

    return rows.map((row) => ({
      page: row.page,
      y: row.y,

      text: row.items
        .sort((a, b) => a.x - b.x)
        .map((i) => i.text)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim(),

      items: row.items,
    }));
}