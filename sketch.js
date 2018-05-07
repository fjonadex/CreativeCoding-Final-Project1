var osc, osc2, envelope, envelope2, fft, fft2; //declaring variables
var isone, istwo, isthree, isfour, isfive, issix, isseven, iseight;
var isQ, isW, isE, isR, isT;
var isZ, isX, isC;
var mic, voicerecord, soundFile, instrumental, recorder, soundFile2;
var p;
var ha = 0;
var speed= 0.05;

function preload() {
	instrumental = loadSound('Drums_Only_Beat.mp3'); //Load Instrumental
}

function setup() { //setup 
	createCanvas(windowWidth, windowHeight);
	background(100);
	osc = new p5.SinOsc();  //assigning sine wave to osc variables
	osc2 = new p5.SinOsc();

	envelope = new p5.Env();
	envelope2 = new p5.Env();

	envelope.setADSR(0.003, 0.01, 0.95, 0.03); //envelope to adjust the sound
	envelope2.setADSR(0.1, 0.3, 0.1, 0.5);

	envelope.setRange(1, 0);
	envelope2.setRange(1, 0);

	osc.start();
	osc2.start();
	osc.amp(0)
	osc2.amp(0)

	fft = new p5.FFT();

	mic = new p5.AudioIn();
	mic.start();
	voicerecord = new p5.SoundRecorder();
	voicerecord.setInput(mic);
	soundFile = new p5.SoundFile();
	fft2 = new p5.FFT();
	fft2.setInput(soundFile);

	recorder = new p5.SoundRecorder();
	recorder.setInput();
	soundFile2 = new p5.SoundFile();

	var RecordVoice = createButton("Record Your Voice"); //Voice Record Button
	RecordVoice.position(350, 100);
	RecordVoice.mousePressed(record);

	var StopRecording = createButton("Stop Recording");//Stop Recording Button
	StopRecording.position(350, 130);
	StopRecording.mousePressed(stopRecord);

	var PlayRecording = createButton("Play Recording");//Play Button
	PlayRecording.position(100, 50);
	PlayRecording.mousePressed(playRecord);

	var RecordSong = createButton("Record Your Song"); //Record Song
	RecordSong.position(100, 450);
	RecordSong.mousePressed(musicRecord);

	var StopSong = createButton("Stop Song Recording"); //Stop Song Recording
	StopSong.position(260, 450);
	StopSong.mousePressed(RecordStop);

	var SaveSong = createButton("Save Your Song"); //Save The Song Recorded
	SaveSong.position(260, 470);
	SaveSong.mousePressed(SaveRecord);
}

function draw() { //draw function
	//shark();
	push();
	var PlayRecord = createButton("Play Your Song");//Play The Song Recorded
	PlayRecord.position(100, 470);
	PlayRecord.mousePressed(RecordPlay);
	textSize(20);
	text('Use 1,2,3,4,5,6,7,8 to control the Instrument', 20, 350); //Instructional Text
	text('Use "p" to play the instrumental and "o" to stop the instrumental', 470, 420);//Instructional Text
	text('Use "a" to play your voice recording', 30, 420);//Instructional Text
	pop();
	push();
	translate(800, 100)
	if (isone == true) {
		ellipse(56, 46, 55, 55); //draws head
	}
	if (istwo == true) {
		line(56, 70, 56, 150); //draws torso
	}
	if (isthree == true) {  
		line(30, 80, 56, 90); //draws arm on left side
	}
	if (isfour == true) {
		line(56, 90, 88, 80);//draws arm on right side
	}
	if (issix == true) {
		line(56, 150, 85, 180); //draws leg on right side
	}
	if (isfive == true) {
		line(56, 150, 35, 180);//draws leg on left side
	}
	if (isseven == true) {  //draws eyes
		push();
		textSize(28);
		text('.  .', 42, 42);
		pop();
	}
	if (iseight == true) {
		arc(56, 48, 30, 30, 0, HALF_PI); // draws smile
	}
	pop();
	if (isQ == true) {
		Sun(); 						//draws sun
	}
	if (isW == true) {
		Grass();			//draws grass
	}
	if (isE == true) {
		River();			//draws river
	}
	if (isR == true) {
		regcloud();
		smallcloud();		//draws cloud
	}
	if (isT == true) {
		blue_sky()	//draws sky
	}
	if (isZ == true) {
		darksky();	//draws dark sky
	}
  if (isX == true){
			darkcloud(); //draws dark clouds
			moon();//draws moon
	}

}


function keyTyped() {
	if (key == '1') {
		playKeys(72); //plays note
		isone = !isone;
	}
	if (key == '2') {
		playKeys(74);
		istwo = !istwo;
	}
	if (key == '3') {
		playKeys(76);
		isthree = !isthree;
	}
	if (key == '4') {
		playKeys(77);
		isfour = !isfour;
	}
	if (key == '5') {
		playKeys(79);
		isfive = !isfive;
	}
	if (key == '6') {
		playKeys(81);
		issix = !issix;
	}
	if (key == '7') {
		playKeys(83);
		isseven = !isseven;
	}
	if (key == '8') {
		playKeys(84);
		iseight = !iseight;
	}
	if (key == 'q') {
		playKeys(86);
		isQ = !isQ;
	}
	if (key == 'w'){
		playKeys(88);
		isW = !isW;
	}
		if (key == 'e'){
		playKeys(89);
		isE = !isE;
	}
	if (key == 'r'){
		playKeys(91);
		isR = !isR;
	}
	if (key == 't'){
		playKeys(93);
		isT = !isT;
	}
	if (key == 'z'){
		playKeys(25);
		isZ = !isZ;
	}
	if (key == 'x'){
		playKeys(27);
		isX = !isX;
	}
	if (key == 'a') {
		playRecord();
	}
	if (key == 'o') {
		stopInstrumental();
	}
	if (key == 'p') {
		playInstrumental();
	}

}

function playKeys(midiNumba) {
	osc.freq(midiToFreq(midiNumba));
	osc2.freq(midiToFreq(midiNumba + 6));
	envelope.play(osc);
	envelope2.play(osc);
}

function record() {
	background("green");
	voicerecord.record(soundFile);
}

function stopRecord() {
	background(100);
	voicerecord.stop();
}

function playRecord() {
	background('red');
	soundFile.stop();
	soundFile.play();
}

function playInstrumental() {
	instrumental.play();
}

function stopInstrumental() {
	instrumental.stop();
}

function musicRecord() {
	background('blue');
	recorder.record(soundFile2);
}

function RecordStop() {
	background('pink');
	recorder.stop();
	voicerecord.stop();
	stopInstrumental();
}

function RecordPlay() {
	portrait();
	soundFile2.play();
}

function SaveRecord() {
	saveSound(soundFile2, 'Your KickAss Song');
}

function Sun() {
	push();
	fill("yellow");
	ellipse(1000, 50, 100, 100);
	pop();
}

function Grass() { //grass function
	push();
	noStroke();
	fill(69, 244, 66);
	rect(0, 265, 1500, 150);
	pop();
}
function River() { //river function
	push();
	noStroke();
	fill(65, 232, 244);
	rect(0, 415, 1500, 300);
	pop();
}
function smallcloud(){ //cloud function
push();
noStroke();
ellipse(56, 46, 64, 55);
ellipse(40, 46, 53, 49);
ellipse(73, 46, 53, 49);
pop();
}
function regcloud(){ //cloud function
push();
noStroke();
ellipse(756, 46, 85, 60);
ellipse(740, 53, 53, 49);
ellipse(773, 39, 53, 49);
ellipse(773, 46, 85, 45);
ellipse(720, 46, 85, 45);
pop();
}
function blue_sky(){ //sky function
push();
fill(135, 255, 255);
rect(0,0,1500,265);
pop();
}
function darkcloud(){ //dark cloud function
push();
fill(55, 58, 58)
noStroke();
ellipse(56, 46, 64, 55);
ellipse(40, 46, 53, 49);
ellipse(73, 46, 53, 49);
ellipse(756, 46, 85, 60);
ellipse(740, 53, 53, 49);
ellipse(773, 39, 53, 49);
ellipse(773, 46, 85, 45);
ellipse(720, 46, 85, 45);
pop();
}
function darksky(){ //dark sky function
push();
fill(95, 112, 140);
rect(0,0,1500,265);
pop();
}
function moon(){
	push();
  fill(196, 201, 209);
	ellipse(1000, 50, 100, 100);
	pop();
}
function shark() {
	fill("gray");
	triangle(30, 75, 58, 20, 86, 75);
}