import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MusicService } from '../shared/music.service';
import { MatMenu } from '@angular/material/menu';
import { Subscription } from 'rxjs';
import { Song } from '../song.interface';
import { Observable } from 'rxjs';
import { Analysis } from '../analysis.interface';
import { LyricAnalysisCardComponent } from '../lyric-analysis-card/lyric-analysis-card.component';



@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css'],
})
export class MusicComponent implements OnInit, OnDestroy {

  analysis: Analysis | undefined;
  

  public musicInfoSubscription: Subscription;
  public musicInfo: any;

   @ViewChild('audioPlayer', { static: false }) audioPlayer!: ElementRef;
      @ViewChild('songTemplate', { read: MatMenu }) songTemplate!: MatMenu;


  private subscriptions = new Subscription();
  
  paused: boolean = true;
  progress: number = 0;
  minimized: boolean = false;
  selectedGenre = '';
  currentAlbumArt = '';
  


   lyricAnalysis$: Observable<any>;


  songs: any[] = [];
  filteredSongs: any[] = [];
  genres: string[] = [];
   
  public songData: any;
  currentSong = this.musicService.getCurrentSong();
  

  // genres = Array.from(new Set(this.songs.map((song) => song.genre)));


constructor(public musicService: MusicService) {this.musicInfoSubscription = new Subscription();this.lyricAnalysis$ = this.musicService.lyricsAnalysis$; }


private currentSongIndexSubscription!: Subscription;



ngOnInit(): void {
   this.subscriptions.add(
  this.lyricAnalysis$.subscribe((data) => {
    console.log('Lyric Analysis Data:', data);
    this.analysis = data;
  })
);

  this.musicService.getSongData().subscribe((data: any) => {
  console.log(data);
  this.songData = data;
});
  this.musicInfoSubscription = this.musicService.musicInfo$.subscribe(
      (data) => {
        console.log('Music Info:', data);
        // Do something with the data
      },
      (error) => {
        console.error('Error fetching music info:', error);
      }
    );

  this.songs = this.musicService.getSongs();
  this.filteredSongs = this.songs;
  this.genres = Array.from(new Set(this.songs.map((song) => song.genre)));

  this.subscriptions.add(
    this.musicService.currentSong$.subscribe((currentSong) => {
      this.currentSong = currentSong;
      this.currentAlbumArt = currentSong.albumArt;
    })
  );
  



  const pauseSub = this.subscriptions.add(
    this.musicService.isPaused$.subscribe((paused) => {
      this.paused = !paused;
      this.updatePlayPauseState();
    })
  );

  this.currentSongIndexSubscription = this.musicService.currentSongIndex$.subscribe((index) => {
  this.currentSong = this.filteredSongs[index];
});



  const currentSongSub = this.subscriptions.add(
    this.musicService.currentSong$.subscribe((currentSong) => {
      this.currentSong = currentSong;
    })
  );

  const songSub = this.subscriptions.add(
    this.musicService.getAudioSourceObservable().subscribe((src) => {
      this.audioPlayer.nativeElement.src = src;
    })
  );

  const audioSrcSub = this.subscriptions.add(
    this.musicService.getAudioSourceObservable().subscribe((src) => {
      if (this.audioPlayer) {
        this.audioPlayer.nativeElement.src = src;
        this.audioPlayer.nativeElement.load();
      }
    })
  );

  this.subscriptions.add(pauseSub);
  this.subscriptions.add(songSub);
  this.subscriptions.add(audioSrcSub);
  this.subscriptions.add(currentSongSub);
}




//ngOnDestroy
ngOnDestroy(): void {

   if (this.musicInfoSubscription) {
      this.musicInfoSubscription.unsubscribe();
    }

    
  this.subscriptions.unsubscribe();
  this.musicService.removeTimeUpdateListener(this.updateProgressBar.bind(this));
  this.currentSongIndexSubscription.unsubscribe();
}

 updateProgressBar(): void {
    const audio = this.musicService.getAudioElement();
    this.progress = (audio.currentTime / audio.duration) * 100;
  }

updateSongList(): void {
  if (this.selectedGenre) {
    this.filteredSongs = this.songs.filter(song => song.genre === this.selectedGenre);
  } else {
    this.filteredSongs = this.songs;
  }
}


ngAfterViewInit(): void {
  this.playSelectedSong();
  }



  
  // products.component.ts
playAudio(): void {
  if (this.paused) {
    this.audioPlayer.nativeElement.play();
  } else {
    this.audioPlayer.nativeElement.pause();
  }
}

updateSongAnalysis(): void {
  this.musicService.getSongData().subscribe((data: any) => {
    console.log(data);
    this.songData = data;
  });
}


toggleMinimize(): void {
        this.minimized = !this.minimized;
    }

togglePlayPause(): void {
        this.musicService.togglePlayPause();
    }

    playNextSong(): void {
        this.musicService.playNextSong();
        this.currentSong = this.musicService.getCurrentSong();
        this.musicService.setCurrentSong(this.currentSong);
        this.updateSongAnalysis();
    }

    playPreviousSong(): void {
        this.musicService.playPreviousSong();
        this.currentSong = this.musicService.getCurrentSong();
        this.musicService.setCurrentSong(this.currentSong);
        this.updateSongAnalysis();
    }

    shuffleSongs(): void {
        this.musicService.shuffleSongs();
        this.currentSong = this.musicService.getCurrentSong();
        this.musicService.setCurrentSong(this.currentSong);
        this.updateSongAnalysis();
    }

playSelectedSong(): void {
    this.musicService.setAudioSource(this.currentSong.audioSrc);
  this.musicService.play();
  this.musicService.setCurrentSong(this.currentSong); 
  this.updateSongAnalysis();   
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
  if (!this.audioPlayer) {
    return;
  }

  if (this.paused) {
    this.audioPlayer.nativeElement.pause();
  } else {
    this.audioPlayer.nativeElement.play();
  }
}

 
addToCart(): void {
    console.log('Added to cart');
    
  }
songsByGenre(genre: string): any[] {
    return this.musicService.songs.filter((song) => song.genre === genre);
  }

  songMenu(genre: string): MatMenu {
    return this.songTemplate;
  }

  playSelectedSongFromMenu(song: any): void {
     this.currentSong = song;
        this.musicService.setCurrentSongIndex(this.musicService.songs.indexOf(song));
        this.musicService.setAudioSource(song.audioSrc);
        this.musicService.play();
  }
  setSelectedGenre(genre: string): void {
    this.selectedGenre = genre;
  }

}
