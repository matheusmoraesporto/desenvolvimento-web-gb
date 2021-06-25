import React from 'react';
import { Banner } from '../../components/Banner';
import { Produtos } from '../../components/Produtos';

export function Home({ user }) {
    return (
        <div>
            <Banner />
            <Produtos user={user} />
        </div>
    );
}
