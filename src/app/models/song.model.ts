export interface Song {
    artist: string,
    title: string,
    lyrics: line[],
}

export interface Songs {
    songs : Song[]
}



interface line {
    text: string;
    //words : word[]
    state: any;
    status: 'right' | 'wrong' | "completed" | null;
}

interface word {
    text: string;
    state: any;
    status: 'right' | 'wrong' | null;
}