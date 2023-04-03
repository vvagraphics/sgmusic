import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MusicService } from '../shared/music.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mini-player',
  templateUrl: './mini-player.component.html',
  styleUrls: ['./mini-player.component.css']
})
export class MiniPlayerComponent implements OnInit, OnDestroy, AfterViewInit  {

  // @ViewChild('audioPlayer') audioPlayer!: ElementRef;

  private subscriptions: Subscription = new Subscription();
  
  paused: boolean = false;
  progress: number = 0;

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

  genres = Array.from(new Set(this.songs.map((song) => song.genre)));

  filteredSongs = this.songs;
  currentSong = this.songs[0];
  selectedGenre = '';

  constructor(private musicService: MusicService) {}

ngOnInit(): void {
  const pauseSub = this.musicService.isPaused$.subscribe((paused) => {
    this.paused = !paused;
  });
  const songSub = this.musicService.currentSongIndex$.subscribe((index) => {
    this.currentSong = this.songs[index];
  });
  this.subscriptions.add(songSub);
  this.subscriptions.add(pauseSub);
  this.subscriptions.add(songSub);
}


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.audioPlayer.nativeElement.removeEventListener('timeupdate', this.updateProgressBar);
  }
updateProgressBar(): void {
  const audio = this.audioPlayer.nativeElement;
  this.progress = (audio.currentTime / audio.duration) * 100;
}

  updateSongList(): void {
    this.filteredSongs = this.songs.filter((song) => song.genre === this.selectedGenre);
  }
ngAfterViewInit(): void {
  // this.playSelectedSong();
  }

togglePlayPause(): void {
  if (this.paused) {
    this.audioPlayer.nativeElement.play();
  } else {
    this.audioPlayer.nativeElement.pause();
  }
  this.musicService.togglePlayPause();
}

  playNextSong(): void {
    const currentIndex = this.filteredSongs.indexOf(this.currentSong);
    if (currentIndex < this.filteredSongs.length - 1) {
      this.currentSong = this.filteredSongs[currentIndex + 1];
    } else {
      this.currentSong = this.filteredSongs[0];
    }
    this.musicService.setCurrentSongIndex(currentIndex + 1);
    this.playSelectedSong();
    this.musicService.play();
    this.musicService.setPaused(false);
  }

  playPreviousSong(): void {
    const currentIndex = this.filteredSongs.indexOf(this.currentSong);
    if (currentIndex > 0) {
      this.currentSong = this.filteredSongs[currentIndex - 1];
    } else {
      this.currentSong = this.filteredSongs[this.filteredSongs.length - 1];
    }
    this.musicService.setCurrentSongIndex(currentIndex - 1);
    this.playSelectedSong();
    this.musicService.play();
    this.musicService.setPaused(false);
  }

  shuffleSongs(): void {
    const currentIndex = this.filteredSongs.indexOf(this.currentSong);
    let randomIndex = Math.floor(Math.random() * this.filteredSongs.length);
    while (randomIndex === currentIndex) {
      randomIndex = Math.floor(Math.random() * this.filteredSongs.length);
    }
    this.currentSong = this.filteredSongs[randomIndex];
    this.musicService.setCurrentSongIndex(randomIndex);
    this.playSelectedSong();
    this.musicService.play();
  }

playSelectedSong(): void {
  if (this.audioPlayer) {
    this.audioPlayer.nativeElement.load();
    this.audioPlayer.nativeElement.play();
    this.musicService.setPaused(false);
  }
}
hasPreviousSong(): boolean {
  const currentIndex = this.filteredSongs.indexOf(this.currentSong);
  return currentIndex > 0;
}

hasNextSong(): boolean {
  const currentIndex = this.filteredSongs.indexOf(this.currentSong);
  return currentIndex < this.filteredSongs.length - 1;
}

 
  addToCart(): void {
    console.log('Added to cart');
    // Implement your add to cart logic here
  }


}
