import { ordersServerApi } from '../http/features/orderServerApi.ts';
import { supabaseClient } from '../http/clientProvider.ts';
import { describe, it, expect, afterAll } from 'vitest';
import type { OrderCreateDto } from '../../contracts/order/orderCreateDto.ts';

describe('Integration: orderServerApi', () => {

    const order:OrderCreateDto = {
        buyer_id: '',
        laptop_id: '',
        status: 'completed',
        price_at_purchase: 7500
    }
    let orderId:string = ''

    it('should create a new order', async() => {
        const created = await ordersServerApi.create(order)
        expect(created).not.toBeNull()

        if(created?.id !== undefined) {
            orderId = created?.id
        }
    })

    it('should fetch order by buyer Id', async() => {
        const fetched = await ordersServerApi.getByUser(order.buyer_id)
        expect(fetched).not.toBeNull()
        expect(fetched).toMatchObject(order)
    })

    it('should update the order status', async() => {
        const updated = await ordersServerApi.updateStatus(orderId, 'paid')
        expect(updated).not.toBeNull()
    })

    afterAll(async () => {
        await supabaseClient.from('items').delete().eq('user_id', 'integration-test-user');
    });
});
