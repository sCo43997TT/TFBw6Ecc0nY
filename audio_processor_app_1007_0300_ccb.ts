// 代码生成时间: 2025-10-07 03:00:30
import { Component } from '@angular/core';
import { AudioService } from './audio.service'; // Import the audio service for processing

@Component({
  selector: 'app-audio-processor',
  template: `<h1>Audio Processing Tool</h1>
            <input type="file" (change)="processAudio($event)" #audioInput>
            <button (click)="playAudio()" [disabled]="!isAudioLoaded">Play</button>
            <button (click)="stopAudio()" [disabled]="!isAudioLoaded">Stop</button>
            <button (click)="muteAudio()" [disabled]="!isAudioLoaded">Mute</button>
            <button (click)="unmuteAudio()" [disabled]="!isAudioLoaded">Unmute</button>
            <button (click)="volumeChange(-0.1)">Decrease Volume</button>
            <button (click)="volumeChange(0.1)">Increase Volume</button>`,
  styleUrls: ['./audio_processor_app.component.css']
})
export class AudioProcessorAppComponent {
  isAudioLoaded: boolean = false;
  audioContext: AudioContext;
  audioNode: AudioNode;

  constructor(private audioService: AudioService) {
    this.audioContext = new (window as any).AudioContext();
  }

  // Process the audio file selected by the user
  processAudio(event: Event): void {
    const audioInput = event.target as HTMLInputElement;
    if (!audioInput.files.length) {
      console.error('No file selected.');
      return;
    }
    const file = audioInput.files[0];
    this.audioService.processAudioFile(file)
      .then(audioBuffer => {
        this.audioNode = this.audioContext.createBufferSource();
        this.audioNode.buffer = audioBuffer;
        this.audioNode.connect(this.audioContext.destination);
        this.isAudioLoaded = true;
      })
      .catch(error => {
        console.error('Error processing audio file:', error);
      });
  }

  // Play the loaded audio
  playAudio(): void {
    if (this.isAudioLoaded && this.audioNode) {
      this.audioNode.start();
    }
  }

  // Stop the playing audio
  stopAudio(): void {
    if (this.isAudioLoaded && this.audioNode) {
      this.audioNode.stop();
    }
  }

  // Mute the audio
  muteAudio(): void {
    if (this.isAudioNode && this.audioNode) {
      this.audioNode.gainNode.gain.value = 0;
    }
  }

  // Unmute the audio
  unmuteAudio(): void {
    if (this.isAudioLoaded && this.audioNode) {
      this.audioNode.gainNode.gain.value = 1;
    }
  }

  // Change the volume of the audio
  volumeChange(change: number): void {
    if (this.isAudioLoaded && this.audioNode) {
      const newVolume = Math.max(0, Math.min(1, this.audioNode.gainNode.gain.value + change));
      this.audioNode.gainNode.gain.value = newVolume;
    }
  }
}

/*
 * AudioService - A service for handling audio file processing.
 *
 * @author Your Name
 * @version 1.0.0
 * @license MIT
 */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Process an audio file and return an Observable of the AudioBuffer
  processAudioFile(file: File): Observable<AudioBuffer> {
    const formData = new FormData();
    formData.append('audio', file);
    return this.http.post<AudioBuffer>(`${this.apiUrl}/process`, formData)
      .pipe(
        map(response => response.buffer),
        catchError(error => {
          console.error('Error processing audio file:', error);
          return of(null);
        }),
      );
  }
}
