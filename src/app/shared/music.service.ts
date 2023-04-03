import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Song } from '../song.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
   private _paused: boolean = true;

  private currentSongIndex = new BehaviorSubject<number>(0);
  currentSongIndex$ = this.currentSongIndex.asObservable();

  private isPaused = new BehaviorSubject<boolean>(false);
  isPaused$ = this.isPaused.asObservable();
  
  private audioSource$ = new BehaviorSubject<string>('');


  songs = [
    // Add your song data here. Replace with real data.
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

  private _audio = new Audio();

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

// In music.service.ts
// getAudioSourceObservable(): Observable<string> {
//   return this.audioSource$.asObservable();
// }



setCurrentSongIndex(index: number): void {
    this.currentSongIndex.next(index);
  }
getCurrentSong(): Song {
  return this.songs[this.currentSongIndex.value];
}

  setPaused(value: boolean): void {
    this.isPaused.next(value);
  }

 togglePlayPause(): void {
  if (this.isPaused.value) {
    this.play();
  } else {
    this.pause();
  }
}
  
  // onPlayButtonClick(): void {
  //   this.isPaused.next(!this.isPaused.value);
  // }

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


}
