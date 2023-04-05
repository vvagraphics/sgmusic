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
      albumArt: 'assets/image/products/dancehall.png',
      audioSrc: 'assets/music/dancehall/Crown on the Dance floor.mp3',
      genre: 'Dancehall',
    },
        {
      title: 'Intergalactic Ride',
      artist: "Lil' Zephyr",
      album: ' Beyond the City Lights',
      albumArt: 'assets/image/products/hiphop.jpg',
      audioSrc: 'assets/music/hiphop/Intergalactic Ride.mp3',
      genre: 'HipHop',
    },
        {
      title: 'Throne of Words',
      artist: 'DJ Spinzone',
      album: 'Party Frenzy',
      albumArt: 'assets/image/products/mixtape.jpg',
      audioSrc: 'assets/music/mixtape/Throne of Words.mp3',
      genre: 'Mixtape',
    },
        {
      title: 'Tears of Salvation - Instrumental',
      artist: 'Crimson Thunder',
      album: 'Electric Rebellion',
      albumArt: 'assets/image/products/rock.png',
      audioSrc: 'assets/music/rock/Tears of Salvation - Instrumental.mp3',
      genre: 'Rock',
    },
        {
      title: 'Rock On Fire',
      artist: 'Phoenix Revival',
      album: ' Rising from the Ashes',
      albumArt: 'assets/image/products/rock3.jpg',
      audioSrc: 'assets/music/rock/Rock On Fire.mp3',
      genre: 'Rock',
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
