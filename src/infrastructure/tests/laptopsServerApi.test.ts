import { laptopsServerApi } from '../http/features/laptopsServerApi.ts';
import { supabaseClient } from '../http/clientProvider.ts';
import { describe, it, expect, afterAll } from 'vitest';
import type { LaptopCreateDto } from '../../contracts/laptop/laptopCreateDto.ts';
import type { LaptopUpdateDto } from '../../contracts/laptop/laptopUpdateDto.ts';

describe('Integration: laptopsServerApi', () => {
    let id = ''
    const newLaptop:LaptopCreateDto = {
        title: 'Something',
        brand: 'TestBrand',
        model: 'aws',
        cpu: 'aws',
        ram_gb: 1,
        storage_gb: 1,
        storage_type: 'SSD',
        gpu:'aws',
        screen_size: 1,
        battery_life_hours: 1,
        condition: 'new',
        description: 'aws',
        price: 1
    };

    it('should fetch all laptops from Supabase', async () => {
        const result = await laptopsServerApi.getAll();

        expect(Array.isArray(result)).toBe(true);
        if (result.length > 0) {
        expect(result[0]).toHaveProperty('id');
        }
    });

    it('should create a laptop and then fetch it', async () => {

        const created = await laptopsServerApi.create(newLaptop);
        expect(created).not.toBeNull();
        expect(created).toMatchObject(newLaptop)

        id = created!.id
    });

    it('should fetch a single laptop', async () => {
        const fetched = await laptopsServerApi.getById(id);
        expect(fetched).not.toBeNull();
        expect(fetched?.id).toBe(id);
    })

    it('should update a laptop', async() => {
        const updatedLaptop:LaptopUpdateDto = {
            id: id,
            title: 'SomethingUpdated',
            brand: 'TestBrandUpdated',
            model: 'awsi',
            cpu: 'awsi',
            ram_gb: 1,
            storage_gb: 1,
            storage_type: 'SSD',
            gpu:'awsi',
            screen_size: 1,
            battery_life_hours: 1,
            condition: 'new',
            description: 'aws',
            price: 1,
        }
        const updated = await laptopsServerApi.update(updatedLaptop);
        expect(updated).not.toBeNull();
        expect(updated).toMatchObject(updatedLaptop);
    })

    it('should delete the laptop used for testing', async() => {
        const response = await laptopsServerApi.delete(id)
        console.log(response)
        expect(response).toBeTruthy()
    })

    afterAll(async () => {
        await supabaseClient.from('items').delete().eq('user_id', 'integration-test-user');
    });
});
