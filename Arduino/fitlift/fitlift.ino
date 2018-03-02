/*
 * ACCELEROMETER ORIENTATIONS:
 * ---------------------------
 * 
 * Bicep Curls
 * - accelerometer on rightside
 * - INT pin facing up
 * 
 * Lateral raises
 * - accelerometer backside (behind person)
 * - INT pin facing up
 * 
 * Tricep extensions
 * - accelerometer facing down
 * - INT pin facing backside (behind person)
 */


#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include <Wire.h>

//ESP 8266 PIN OUTS
#define D1 5  // I2C Bus SCL (clock)
#define D2 4  // I2C Bus SDA (data)
#define D3 0  // Pushbutton - 1k pulldown resistor
#define D6 12 // Red LED
#define D7 13 // Green LED
#define D8 15 // Blue LED

// Network information
const char* ssid = "ENTER NETWORK SSID HERE";
const char* password = "ENTER NETWORK PASSWORD HERE";

// Firebase database information
const char* host = "https://fitlift-38a0c.firebaseio.com";
const int httpsPort = 443;

// FitLift user information
String fitLiftUser = "SAMPLE_USER";
String postUrl = "/new_exercises/" + fitLiftUser + ".json";

// SHA1 fingerprint of the database browser's certificate
// Find out by using chrome dev tools -> security -> view certificate -> details -> SHA1 fingerprint
String fingerprint = "B8 4F 40 70 0C 63 90 E0 07 E8 7D BD B4 11 D0 4A EA 9C 90 F6";

// Timestamp variables
const char* timeHost = "http://api.timezonedb.com";
const char* timeGetUrl = "/v2/get-time-zone?format=json&key=M16RZS5PP1F9&by=zone&zone=America/Los_Angeles";
unsigned long timestamp = 0;    // only stores time in seconds, will be converted to milliseconds in code
unsigned long timestampOffset = 0;  // GMT offset

// MPU-6050 (accelerometer / gyroscope) variables
int16_t accelX, accelY, accelZ;
float gForceX, gForceY, gForceZ;

// Pushbutton / LED variables
bool connectedToInternet;             // Red LED.     On if connected, off otherwise.
bool currentExerciseState;            // Green LED.   On if user can start exercising, off otherwise.
bool lastExerciseState;
bool canExercise;                     // Indiciates whether use can exercise or not. currentExerciseState
unsigned long lastToggleTime = 0;     // Last time exercise pushbutton was toggled on/off
unsigned long exerciseDebounce = 100; // Minimum time pushbutton has to be held to register as a successful toggle
byte exercisesToBlink;                // Blue LED.    Keeps track of how many more exericises in queue are left to blink.
byte blinkOn;                         // Blue LED on or off
unsigned long lastExerciseBlink;      // Last time exercise was turned on/off
unsigned long blinkOnDelay = 550;     // Minimum time blue LED should be on. 0.55s. blinkOnDelay + blinkOff delay must equal exerciseDelay (0.8s)
unsigned long blinkOffDelay = 250;    // Minimum time blue LED should be off. 0.25s

int16_t gyroX, gyroY, gyroZ;
float rotX, rotY, rotZ;

// Arduino time variables
unsigned long lastTime;
unsigned long currentTime;
unsigned long printDelay = 1000;  // time delay in milliseconds, for accelerometer printing purposes
unsigned long exerciseDelay = 800;        // 0.8 second delay before same exercise can be successfully registered
unsigned long exerciseStopDelay = 5000;  // 5 seconds for program to halt after no exercise has been registered
unsigned long lastRecordedExerciseTime;

void setup()
{
  Serial.begin(115200);   // Serial connection

  // LED setup
  pinMode(D3, INPUT);
  pinMode(D6, OUTPUT);
  pinMode(D7, OUTPUT);
  pinMode(D8, OUTPUT);
  digitalWrite(D6, LOW);
  digitalWrite(D7, LOW);
  digitalWrite(D8, LOW);
  connectedToInternet = false;
  canExercise = false;
  currentExerciseState = LOW;
  lastExerciseState = LOW;
  exercisesToBlink = 0;
  blinkOn = false;
  lastExerciseBlink = millis();

  // Network connection
  Serial.println("Connecting to " + String(ssid));
  WiFi.begin(ssid, password);   //WiFi connection
  
  while (WiFi.status() != WL_CONNECTED) {  //Wait for the WiFI connection completion
    delay(1000);
    Serial.println("Waiting for connection");
  }
  
  Serial.println("Connection successful!\n");
  connectedToInternet = true;     // Red LED on. Internet connected.
  digitalWrite(D6, HIGH);
  

  // Set time variables
  lastTime = millis();
  lastRecordedExerciseTime = lastTime;

  // MPU-6050 setup
  Wire.pins(D2, D1);      // Wire.pins(SDA, SCL)
  Wire.begin(D2, D1);
  setupMPU();
}

int rep_count = 0;

float previousX = 0.0;
float previousZ = 0.0;

String exercise = "null";

void loop()
{ 
  currentTime = millis();

  // Record accelerometer and gyroscope input
  recordAccelRegisters();
  recordGyroRegisters();

//  // Print accelerometer data
//  if (currentTime >= lastTime + printDelay) {
//      lastTime = currentTime;
//      printData();
//  }

  // Check exercise state
  checkExerciseState();

  // Turn on/off blue LED whenever successful rep count is detected
  if (exercisesToBlink > 0 && !blinkOn && currentTime >= lastExerciseBlink + blinkOffDelay) {
    digitalWrite(D8, HIGH);
    lastExerciseBlink = currentTime;
    exercisesToBlink--;
    blinkOn = true;
  }
  if (blinkOn && currentTime >= lastExerciseBlink + blinkOnDelay) {
    digitalWrite(D8, LOW);
    lastExerciseBlink = currentTime;
    blinkOn = false;
  }

  if (canExercise) {
    if (currentTime >= lastRecordedExerciseTime + exerciseDelay)
    {
      // DUMBBELL CURLS
      if ((rotX <= 0.0 || rotX >= 5.0) && rotZ >= 75.0 && gForceX <= 0.1 && gForceY <= 1.0 && gForceZ <= 0.1)
      {
        if ((exercise == "null" || exercise == "Bicep Curls"))
        {
          rep_count++;
          exercise = "Bicep Curls";
    
          lastRecordedExerciseTime = currentTime;
  
          exercisesToBlink++;
    
          Serial.print("Current rep count: ");
          Serial.print(rep_count);
          Serial.println("   -----BICEP CURL-----");
        }
      }
    
      // LATERAL RAISES
      else if (previousX <= 0.0 && previousZ >= 50.0 && gForceX <= 0.1 && gForceY <= 0.1 && gForceZ <= 0.1)
      {
        if (exercise == "null" || exercise == "Lateral Raises")
        {
          rep_count++;
          previousX = 0.0;
          previousZ = 0.0;
          exercise = "Lateral Raises";
    
          lastRecordedExerciseTime = currentTime;
  
          exercisesToBlink++;
    
          Serial.print("Current LATERAL rep count: ");
          Serial.print(rep_count);
          Serial.println("    -----LATERAL RAISE-----");
        }
      }
  
      // TRICEP EXTENSIONS
      else if(rotX <= -50.0 && rotZ <= 10.0)
      {
        if((exercise == "null" || exercise == "Tricep Extensions"))
        {
            rep_count++;
            exercise = "Tricep Extensions";
  
            lastRecordedExerciseTime = currentTime;
  
            exercisesToBlink++;
            
            Serial.print("Current TE rep count: ");
            Serial.print(rep_count);
            Serial.println("    -----TRICEP EXTENSION-----");
        }
      }
      else
      {
        if (exercise == "null" || exercise == "Lateral Raises")
        {
          previousX = rotX;
          previousZ = rotZ;
        }
      }
    
    }
  
    if ((currentTime >= lastRecordedExerciseTime + exerciseStopDelay)  && exercise != "null")
    {
      exerciseComplete();
    }
  }
}

void setupMPU()
{
  Wire.beginTransmission(0b1101000);
  Wire.write(0x6B);
  Wire.write(0b00000000);
  Wire.endTransmission();

  Wire.beginTransmission(0b1101000);
  Wire.write(0x1B);
  Wire.write(0b00001000);
  Wire.endTransmission();

  Wire.beginTransmission(0b1101000);
  Wire.write(0x1C);
  Wire.write(0b00000000);
  Wire.endTransmission();
}

void recordAccelRegisters()
{
  Wire.beginTransmission(0b1101000);
  Wire.write(0x3B);
  Wire.endTransmission();

  Wire.requestFrom(0b1101000, 6);

  while (Wire.available() < 6);
  accelX = Wire.read() << 8 | Wire.read();
  accelY = Wire.read() << 8 | Wire.read();
  accelZ = Wire.read() << 8 | Wire.read();

  processAccelData();
}

void processAccelData()
{
  gForceX = accelX / 16384.0;
  gForceY = accelY / 16384.0;
  gForceZ = accelZ / 16384.0;
}

void recordGyroRegisters()
{
  Wire.beginTransmission(0b1101000);
  Wire.write(0x43);
  Wire.endTransmission();

  Wire.requestFrom(0b1101000, 6);

  while (Wire.available() < 6);
  gyroX = Wire.read() << 8 | Wire.read();
  gyroY = Wire.read() << 8 | Wire.read();
  gyroZ = Wire.read() << 8 | Wire.read();

  processGyroData();
}

void processGyroData()
{
  rotX = gyroX / 65.5;
  rotY = gyroY / 65.5;
  rotZ = gyroZ / 65.5;

  // rotX = gyroX / 131.0;
  // rotY = gyroY / 131.0;
  // rotZ = gyroZ / 131.0;
}

void printData()
{
  Serial.print("Gyro:");
  Serial.print(" X=");
  Serial.print(rotX);
  Serial.print(" Y=");
  Serial.print(rotY);
  Serial.print(" Z=");
  Serial.print(rotZ);

  Serial.println();

  Serial.print("Accel:");
  Serial.print(" X=");
  Serial.print(gForceX);
  Serial.print(" Y=");
  Serial.print(gForceY);
  Serial.print(" Z=");
  Serial.println(gForceZ);
}

// Check if user can exercise or not
void checkExerciseState() {
  bool reading = digitalRead(D3);
  if (reading == HIGH && lastExerciseState == LOW && millis() - lastToggleTime >= exerciseDebounce) {
    // Toggle exercise state OFF
    if (currentExerciseState == HIGH) {
      canExercise = false;
      currentExerciseState = LOW; 
      exerciseComplete();
    }
    // Toggle exercise state ON
    else {
      canExercise = true;
      currentExerciseState = HIGH; 
    }
    lastToggleTime = millis();
  }
  digitalWrite(D7, currentExerciseState);
  lastExerciseState = reading;
}

// Called whenever user hasn't exercised for "exerciseStopDelay" seconds,
// OR if user toggles exercise state off manually.
void exerciseComplete() {
  if (rep_count > 0) {
    Serial.println("Current exercise over, post and reset.");
    postData(exercise, rep_count);
    // Blink green LED 5 times to indicate data has been posted
    for (int i = 0; i < 5; i++) {
      digitalWrite(D7, LOW);
      delay(130);
      digitalWrite(D7, HIGH);
      delay(130);
    }
  }
  rep_count = 0;
  exercise = "null";
  
  exercisesToBlink = 0;
  blinkOn = false;

  canExercise = false;
  currentExerciseState = LOW;
  lastExerciseState = LOW;
}

// POST exercise data to Firebase database
void postData(String exerciseType, int reps) {
  // Get timestamp from timezone API
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
    HTTPClient http;    //Declare object of class HTTPClient
    int httpCode;
    String payload;
    char JSONmessageBuffer[300];
    StaticJsonBuffer<300> JSONbuffer;

    http.begin(String(timeHost) + String(timeGetUrl));
    httpCode = http.GET();
    payload = http.getString();

    // status = "OK"
    if (httpCode == 200) {
      payload.toCharArray(JSONmessageBuffer, sizeof(JSONmessageBuffer));
      JsonObject& JSONencoderTime = JSONbuffer.parseObject(JSONmessageBuffer);
      timestamp = JSONencoderTime["timestamp"];
      timestampOffset = JSONencoderTime["gmtOffset"];
      timestamp -= timestampOffset;
    }
    else {
      // Set time to January 1, 2020 12:00:00 AM by default, in seconds
      timestamp = 1577865600000;
    }

    http.end();  //Close connection
  }
  else {
    Serial.println("***Error in WiFi connection. Cannot GET timestamp from timezone API***");
  }
  
  // Post exericse data to database
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
    HTTPClient http;    //Declare object of class HTTPClient
    int httpCode;
    String payload;
    char JSONmessageBuffer[300];
    StaticJsonBuffer<300> JSONbuffer;

    String JSONdata = String("{\n") + 
                      String("  \"reps\": ") + String(reps) + String(",\n") +
                      String("  \"timeStamp\": ") + String(timestamp) + String("000,\n") +
                      String("  \"type\": \"") + String(exerciseType) + String("\"\n") +
                      String("}");

    Serial.println(JSONdata);

    http.begin(String(host) + String(postUrl), fingerprint);
    http.addHeader("Content-Type", "application/json");  //Specify content-type header

    httpCode = http.POST(JSONdata);
    payload = http.getString();                                        //Get the response payload
    Serial.println(payload);    //Print request response payload
    
    // status = "OK"
    if (httpCode == 200) {
      Serial.println("POST request success!\n");
    }
    else {
      Serial.println("***POST request ERROR***");
    }
 
    http.end();  //Close connection
  }
  else {
    Serial.println("***Error in WiFi connection. Cannot POST data to database***");
  }
}
