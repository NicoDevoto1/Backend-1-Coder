//Este archivo se encarga unica y exclusivamente de leer y escribir archivos JSON. No toma decisiones ni aplica reglas, la diferencia con services es que bookings apunta al archivo bookings.json


import fs from 'fs/promises';
import path from 'path';

const filePath = path.resolve('src', 'data', 'bookings.json');

const read = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch { return []; }
};

const write = async (data) => fs.writeFile(filePath, JSON.stringify(data, null, 2));

export default class BookingsDAO {
    async getById(id) {
        const items = await read();
        return items.find(i => i.id === id) || null;
    }
    
    async create(data) {
        const items = await read();
        items.push(data);
        await write(items);
        return data;
    }
    
    async update(id, data) {
        const items = await read();
        const index = items.findIndex(i => i.id === id);
        if (index === -1) return null;
        
        items[index] = data;
        await write(items);
        return items[index];
    }
}