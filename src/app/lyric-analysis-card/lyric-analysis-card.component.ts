import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MusicService } from '../shared/music.service';
import { Analysis } from '../analysis.interface';

interface SongData {
  // Add the properties for songData here
}

@Component({
  selector: 'app-lyric-analysis-card',
  templateUrl: './lyric-analysis-card.component.html',
  styleUrls: ['./lyric-analysis-card.component.css']
})
export class LyricAnalysisCardComponent implements OnInit, OnChanges {
  @Input() analysis?: Analysis;
  @Input() songData?: SongData;
  
  consoleLogData: any;
  lyricsAnalysis: any;
  // private _lyricsAnalysis: any;

  constructor(private musicService: MusicService) { }

  ngOnInit(): void { 
    // this.musicService.lyricsAnalysis$.subscribe((lyricsAnalysis) => {
    //   this._lyricsAnalysis = lyricsAnalysis;
    // });

    console.log('LyricAnalysisCardComponent analysis:', this.analysis);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log('LyricAnalysisCardComponent changes:', changes);
    if (changes['analysis'] && changes['analysis'].currentValue) {
      this.consoleLogData = changes['analysis'].currentValue;
    }
  }

getKeywords(keywords: string[] | undefined): string {
  if (!keywords) {
    return '';
  }
  return keywords.join(', ');
}

getMoodNames(moods: { [key: string]: number }[] | undefined): string {
  if (!moods) {
    return '';
  }
  return moods.map((mood) => Object.keys(mood)[0]).join(', ');
}

getThemeNames(themes: { [key: string]: number }[] | undefined): string {
  if (!themes) {
    return '';
  }
  return themes.map((theme) => Object.keys(theme)[0]).join(', ');
}


}
