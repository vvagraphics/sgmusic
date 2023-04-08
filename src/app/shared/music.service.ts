import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Song } from '../song.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MusicService {

  private _paused: boolean = true;
  private currentSongIndexSubject = new BehaviorSubject<number>(0);
  public currentSongIndex$ = this.currentSongIndexSubject.asObservable();
  private currentSongIndex = 0;
  private isPaused = new BehaviorSubject<boolean>(true);
          isPaused$ = this.isPaused.asObservable();
  private audioSource$ = new BehaviorSubject<string>('');
  private currentAlbumCoverSubject = new BehaviorSubject<string>('');
currentAlbumCover$ = this.currentAlbumCoverSubject.asObservable();

  private _audio = new Audio();
  

  
  public songs = [
    
    {
      title: 'Sunset Groove',
      artist: 'Jazzy Lion',
      album: ' Island Breeze',
      albumArt: 'assets/image/music/dancehall.png',
      audioSrc: 'assets/music/dancehall/Crown on the Dance floor.mp3',
      genre: 'Dancehall',
    },
        {
      title: 'Intergalactic Ride',
      artist: "Lil' Zephyr",
      album: ' Beyond the City Lights',
      albumArt: 'assets/image/music/hiphop.jpg',
      audioSrc: 'assets/music/hiphop/Intergalactic Ride.mp3',
      genre: 'HipHop',
    },
        {
      title: 'Throne of Words',
      artist: 'DJ Spinzone',
      album: 'Party Frenzy',
      albumArt: 'assets/image/music/mixtape.jpg',
      audioSrc: 'assets/music/mixtape/Throne of Words.mp3',
      genre: 'Mixtape',
    },
        {
      title: 'Tears of Salvation - Instrumental',
      artist: 'Crimson Thunder',
      album: 'Electric Rebellion',
      albumArt: 'assets/image/music/rock.png',
      audioSrc: 'assets/music/rock/Tears of Salvation - Instrumental.mp3',
      genre: 'Rock',
    },
        {
      title: 'ES_Might as Well RocknRoll - TAGE',
      artist: 'TAGE',
      album: 'Might as Well RocknRoll',
      albumArt: 'assets/music/rock/300x300.jpg',
      audioSrc: 'assets/music/rock/ES_Might as Well RocknRoll - TAGE.mp3',
      genre: 'Rock',
    },
    {
      title: `ES_Bo's Lullaby - John B. Lund`,
      artist: 'John B. Lund',
      album: `Bo's Lullaby`,
      albumArt: `assets/music/asmr/300x300.jpg`,
      audioSrc: `assets/music/asmr/ES_Bo's Lullaby - John B. Lund.mp3`,
      genre: 'ASMR',
    },
        {
      title: `ES_Right Now (Call On Me) - Thyra`,
      artist: 'John B. Lund',
      album: `Bo's Lullaby`,
      albumArt: `assets/music/country/300x300.jpg`,
      audioSrc: `assets/music/country/ES_Right Now (Call On Me) - Thyra.mp3`,
      genre: 'Country',
    },
    {
      title: `ES_Don't Play Me - Filthy The Kid`,
      artist: 'Filthy The Kid',
      album: `Don't Play Me`,
      albumArt: `assets/music/korean/300x300.jpg`,
      audioSrc: `assets/music/korean/ES_Don't Play Me - Filthy The Kid.mp3`,
      genre: 'Korean',
    },
    {
      title: `ES_Ana - Feras Charestan`,
      artist: 'Feras Charestan',
      album: `Ana`,
      albumArt: `assets/music/middle east/300x300.jpg`,
      audioSrc: `assets/music/middle east/ES_Ana - Feras Charestan.mp3`,
      genre: 'MiddleEast',
    },
    {
      title: `ES_Hokkaido - Saira Ridley`,
      artist: 'Saira Ridley',
      album: `Hokkaido`,
      albumArt: `assets/music/east/300x300.jpg`,
      audioSrc: `assets/music/east/ES_Hokkaido - Saira Ridley.mp3`,
      genre: 'East',
    },
    {
      title: `ES_Sunday Morning Sermon - Duke Herrington`,
      artist: 'Duke Herrington',
      album: `Sunday Morning Sermon`,
      albumArt: `assets/music/gospel/300x300.jpg`,
      audioSrc: `assets/music/gospel/ES_Sunday Morning Sermon - Duke Herrington.mp3`,
      genre: 'Gospel',
    },
    {
      title: `ES_Modest - Katori Walker`,
      artist: 'Katori Walker',
      album: `Modest`,
      albumArt: `assets/music/rnb/300x300.jpg`,
      audioSrc: `assets/music/rnb/ES_Modest - Katori Walker.mp3`,
      genre: 'RnB',
    },
  ];

      private currentSongSubject = new BehaviorSubject<any>(this.songs[0]);
currentSong$ = this.currentSongSubject.asObservable();

setCurrentSong(song: any): void {
  this.currentSongSubject.next(song);
}

    
   getSongs(): any[] {
    return this.songs;
  }

  constructor() {}

  
 setAudioSource(src: string): void {
  this.audioSource$.next(src);
}

getAudioElement(): HTMLAudioElement {
  return this._audio;
}

getAudioSourceObservable(): BehaviorSubject<string> {
    return this.audioSource$;
  }

getCurrentSong(): any {
    return this.songs[this.currentSongIndex];
  }


 setCurrentSongIndex(index: number): void {
  this.currentSongIndexSubject.next(index);
  this.currentAlbumCoverSubject.next(this.songs[index].albumArt);
}
  
  setPaused(value: boolean): void {
    this.isPaused.next(value);
  }

  play(): void {
  this._audio.play();
  this.isPaused.next(false);
}

pause(): void {
  this._audio.pause();
  this.isPaused.next(true);
}
isPausedValue(): boolean {
  return this.isPaused.value;
}
removeTimeUpdateListener(listener: () => void): void {
  this._audio.removeEventListener('timeupdate', listener);
}
 
togglePlayPause(): void {
    this.isPaused.next(!this.isPaused.getValue());
  }

 playNextSong(): void {
    if (this.hasNextSong()) {
      this.currentSongIndex++;
    } else {
      this.currentSongIndex = 0;
    }
    this.setAudioSource(this.getCurrentSong().audioSrc);
    this.play();
  }

  playPreviousSong(): void {
    if (this.hasPreviousSong()) {
      this.currentSongIndex--;
    } else {
      this.currentSongIndex = this.songs.length - 1;
    }
    this.setAudioSource(this.getCurrentSong().audioSrc);
    this.play();
  }

  shuffleSongs(): void {
    let randomIndex = Math.floor(Math.random() * this.songs.length);
    while (randomIndex === this.currentSongIndex) {
      randomIndex = Math.floor(Math.random() * this.songs.length);
    }
    this.currentSongIndex = randomIndex;
    this.setAudioSource(this.getCurrentSong().audioSrc);
    this.play();
  }

  hasPreviousSong(): boolean {
    return this.currentSongIndex > 0;
  }

  hasNextSong(): boolean {
    return this.currentSongIndex < this.songs.length - 1;
  }
}
