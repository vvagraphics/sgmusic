import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MusicService } from '../shared/music.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {

    @ViewChild('audioPlayer', { static: false }) audioPlayer!: ElementRef;


  private subscriptions = new Subscription();
  
  paused: boolean = true;
  
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




  //ngOnInit
// In products.component.ts
ngOnInit(): void {
  const pauseSub = this.subscriptions.add(
      this.musicService.isPaused$.subscribe((paused) => {
        this.paused = !paused;
        this.updatePlayPauseState();
      })
    );
  
  const songSub = this.musicService.getAudioSourceObservable().subscribe(src => {
      this.audioPlayer.nativeElement.src = src;
    });
    
  const audioSrcSub = this.musicService.getAudioSourceObservable().subscribe((src) => {
    if (this.audioPlayer) {
      this.audioPlayer.nativeElement.src = src;
      this.audioPlayer.nativeElement.load();
    }
  });

  this.subscriptions.add(pauseSub);
  this.subscriptions.add(songSub);
  this.subscriptions.add(audioSrcSub);
}




//ngOnDestroy
ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
  this.musicService.removeTimeUpdateListener(this.updateProgressBar.bind(this));
}

 updateProgressBar(): void {
    const audio = this.musicService.getAudioElement();
    this.progress = (audio.currentTime / audio.duration) * 100;
  }

  updateSongList(): void {
    this.filteredSongs = this.songs.filter((song) => song.genre === this.selectedGenre);
  }
ngAfterViewInit(): void {
  // this.playSelectedSong();
  }

  // products.component.ts
playAudio(): void {
  if (this.paused) {
    this.audioPlayer.nativeElement.play();
  } else {
    this.audioPlayer.nativeElement.pause();
  }
}

togglePlayPause(): void {
  if (this.currentSong === this.musicService.getCurrentSong()) {
    this.musicService.togglePlayPause();
  } else {
    const currentIndex = this.filteredSongs.indexOf(this.currentSong);
    this.musicService.setCurrentSongIndex(currentIndex);
    this.musicService.setAudioSource(this.currentSong.audioSrc);
    this.musicService.togglePlayPause();
  }
}

  playNextSong(): void {
    this.musicService.playNextSong();
    // const currentIndex = this.filteredSongs.indexOf(this.currentSong);
    // if (currentIndex < this.filteredSongs.length - 1) {
    //   this.currentSong = this.filteredSongs[currentIndex + 1];
    // } else {
    //   this.currentSong = this.filteredSongs[0];
    // }
    // this.musicService.setCurrentSongIndex(currentIndex + 1);
    // this.playSelectedSong();
    // this.musicService.play();
    // this.musicService.setPaused(false);
  }

  playPreviousSong(): void {
    this.musicService.playPreviousSong();
    // const currentIndex = this.filteredSongs.indexOf(this.currentSong);
    // if (currentIndex > 0) {
    //   this.currentSong = this.filteredSongs[currentIndex - 1];
    // } else {
    //   this.currentSong = this.filteredSongs[this.filteredSongs.length - 1];
    // }
    // this.musicService.setCurrentSongIndex(currentIndex - 1);
    // this.playSelectedSong();
    // this.musicService.play();
    // this.musicService.setPaused(false);
  }

  shuffleSongs(): void {
    this.musicService.shuffleSongs();
    // const currentIndex = this.filteredSongs.indexOf(this.currentSong);
    // let randomIndex = Math.floor(Math.random() * this.filteredSongs.length);
    // while (randomIndex === currentIndex) {
    //   randomIndex = Math.floor(Math.random() * this.filteredSongs.length);
    // }
    // this.currentSong = this.filteredSongs[randomIndex];
    // this.musicService.setCurrentSongIndex(randomIndex);
    // this.playSelectedSong();
    // this.musicService.play();
  }

playSelectedSong(): void {
    this.musicService.setAudioSource(this.currentSong.audioSrc);
    this.musicService.play();
    
    
  }
hasPreviousSong(): boolean {
  const currentIndex = this.filteredSongs.indexOf(this.currentSong);
  return currentIndex > 0;
}

hasNextSong(): boolean {
  const currentIndex = this.filteredSongs.indexOf(this.currentSong);
  return currentIndex < this.filteredSongs.length - 1;
}

private updatePlayPauseState(): void {
    if (this.paused) {
      this.audioPlayer.nativeElement.pause();
    } else {
      this.audioPlayer.nativeElement.play();
    }
  }
 
addToCart(): void {
    console.log('Added to cart');
    
  }


}
