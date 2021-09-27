export interface Song {
    artist: string,
    title: string,
    label: string,
    lyrics: LyricsLine[],
}

export interface Songs {
    songs : Song[]
}

export interface LyricsLine {
    text: string;
    state: any;
    status: 'right' | 'wrong' | "completed" | null;
}

interface word {
    text: string;
    state: any;
    status: 'right' | 'wrong' | null;
}