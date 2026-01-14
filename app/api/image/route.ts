import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt para imagem é obrigatório' }, { status: 400 });
        }

        const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
        const apiToken = process.env.CLOUDFLARE_API_TOKEN;

        if (!accountId || !apiToken) {
            return NextResponse.json({ error: 'Variáveis de ambiente Cloudflare não configuradas.' }, { status: 500 });
        }

        const response = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/stabilityai/stable-diffusion-xl-lightning`,
            // `@cf/stabilityai/stable-diffusion-xl-base-1.0` ou `@cf/stabilityai/stable-diffusion-xl-lightning`
            // Escolha o modelo que melhor se adequa ao "nano banana" em termos de qualidade/velocidade
            {
                headers: { Authorization: `Bearer ${apiToken}` },
                method: 'POST',
                body: JSON.stringify({ prompt }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro Cloudflare API:', errorData);
            return NextResponse.json({ error: 'Erro ao gerar imagem com Bunix.', details: errorData }, { status: response.status });
        }

        // A Cloudflare AI retorna uma imagem PNG como blob binário
        const imageBlob = await response.blob();
        const base64Image = Buffer.from(await imageBlob.arrayBuffer()).toString('base64');
        const imageUrl = `data:image/png;base64,${base64Image}`;

        return NextResponse.json({ imageUrl, model: "Bunix" });

    } catch (error) {
        console.error('Erro ao chamar a Cloudflare AI:', error);
        return NextResponse.json({ error: 'Erro ao processar sua requisição de imagem.' }, { status: 500 });
    }
}
