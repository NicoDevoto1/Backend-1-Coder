//Este archivo se encarga unica y exclusivamente de leer y escribir archivos JSON. No toma decisiones ni aplica reglas

import fs from 'fs/promises';
import path from 'path';

const filePath = path.resolve('src', 'data', 'services.json');

const read = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch { return []; }
};

const write = async (data) => fs.writeFile(filePath, JSON.stringify(data, null, 2));

export default class ServicesDAO {
    async getAll() { return await read(); }
    
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
        
        items[index] = { ...items[index], ...data, id };
        await write(items);
        return items[index];
    }
    
    async delete(id) {
        const items = await read();
        const index = items.findIndex(i => i.id === id);
        if (index === -1) return null;
        
        const [deleted] = items.splice(index, 1);
        await write(items);
        return deleted;
    }
}