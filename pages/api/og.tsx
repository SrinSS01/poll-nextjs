import { ImageResponse } from '@vercel/og';
import {CSSProperties} from "react";
import {NextRequest} from "next/server";

export const config = {
    runtime: 'experimental-edge',
};

const pbStyles: CSSProperties = {
    background: '#FFF',
    borderRadius: 12,
    width: '90%',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#000000',
    fontSize: 20,
}

export default function handler(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const N = searchParams.get('N') ?? '2';
    const topic = searchParams.get('topic') ?? 'Topic';
    let length = Number(N);
    let sum = 0
    const polls = new Array<number>(length);
    const pollsText = new Array<string>(length)
    for (let i = 0; i < length; i++) {
        const s = (searchParams.get(`${i + 1}`) ?? '0').split(',');
        pollsText[i] = s[1] ?? 'Text'
        sum += polls[i] = Number(s[0]);
    }
    sum = sum === 0? 1: sum;
    const arr = new Array<JSX.Element>(length);
    const pollsPercentage = new Array<number>(length)
    for (let i = 0; i < length; i++) {
        pollsPercentage[i] = polls[i] / sum
    }
    for (let i = 0; i < arr.length; i++) {
        const percentage = (pollsPercentage[i] * 100).toFixed(0);
        arr[i] =
            <div style={{ display: "flex" }}>
                <div key={ i * i } style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 60,
                    height: '100%',
                    background: '#fff',
                    marginRight: 9,
                    borderRadius: '50%',
                    color: '#000',
                }}>{ i + 1 }</div>
                <div key={ i } style={ pbStyles }>
                    <div style={ {
                        position: 'absolute',
                        width: `${percentage}%`,
                        height: '100%',
                        background: '#ffff00',
                        borderRadius: 12,
                        boxShadow: '0px 0px 45px #C9C917FF'
                    } }></div>
                    <div style={{ marginLeft: 20, display: "flex" }}>{ pollsText[i] }</div>
                    <div style={{ marginRight: 20, display: 'flex' }}>{ percentage }%</div>
                </div>
            </div>;
    }
    return new ImageResponse(
        (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '50px 40px 50px 40px',
                background: '#000',
                color: '#fff',
            }}>
                <div style={{
                    inlineSize: 'min-content',
                    wordBreak: 'break-all',
                    overflowWrap: 'break-word',
                    display: "flex",
                    width: '100%',
                    fontSize: 35
                }}>{ topic }</div>
                { arr }
            </div>
        ),
        {
            width: 1200,
            height: 600,
        },
    );
}