#include "DHTesp.h" // Click here to get the library: http://librarymanager/All#DHTesp
#include <ESP8266Firebase.h>
#include <ESP8266WiFi.h>

//for heartbeat
#define heartbeat_sensor 33
#define samp_siz 4
#define rise_threshold 5
void hearbeat_reading();
//for dht11
void temperature_reading();
//for firebase
#define _SSID "test"          // Your WiFi SSID
#define _PASSWORD "test123456"      // Your WiFi Password
#define REFERENCE_URL "https://brew-creww-1fbfe-default-rtdb.firebaseio.com/"  
Firebase firebase(REFERENCE_URL);
#ifdef ESP32
#pragma message(THIS EXAMPLE IS FOR ESP8266 ONLY!)
#error Select ESP8266 board.
#endif

DHTesp dht;
int sensorPin = D0;
void setup()
{
  Serial.begin(9600);
  Serial.println();
  String thisBoard= ARDUINO_BOARD;
  Serial.println(thisBoard);
  dht.setup(D7, DHTesp::DHT22); 
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(1000);

  // Connect to WiFi
  Serial.println();
  Serial.println();
  Serial.print("Connecting to: ");
  Serial.println(_SSID);
  WiFi.begin(_SSID, _PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print("-");
  }

  Serial.println("");
  Serial.println("WiFi Connected");

  // Print the IP address
  Serial.print("IP Address: ");
  Serial.print("http://");
  Serial.print(WiFi.localIP());
  Serial.println("/");
  digitalWrite(LED_BUILTIN, HIGH);
  


}

void loop()
{
  hearbeat_reading();
  delay(100);
  temperature_reading();
  delay(100);
  
  
}
void hearbeat_reading()
{
  float reads[samp_siz], sum;
  long int now, ptr;
  float last, reader, start;
  float first, second, third, before, print_value;
  bool rising;
  int rise_count;
  int n;
  long int last_beat;

  for (int i=0; i<samp_siz; i++)
    reads[i] = 0;
  sum = 0;
  ptr = 0;

  while (1) {
    n = 0;
    start = millis();
    reader = 0.;
    do {
      reader += analogRead(A0);
      n++;
      now = millis();
    }

    while (now < start + 20);
    reader /= n;  // we got an average
    sum -= reads[ptr];
    sum += reader;
    reads[ptr] = reader;
    last = sum / samp_siz;

    if (last > before) {
      rise_count++;

      if (!rising && rise_count > rise_threshold) {
        digitalWrite(10, HIGH);
        rising = true;
        first = millis() - last_beat;
        last_beat = millis();

        print_value = 60000. / (0.4 * first + 0.3 * second + 0.3 * third);
        Serial.println(print_value);
        unsigned long currentTime = millis() / 1000;
          String data = "{\"value\": " + String(print_value) + ", \"timestamp\": " + String(currentTime) + "}";
          Serial.println(data);
          firebase.pushFloat("heartbeat", print_value);
          //firebase.pushString("heartbeat", data);
        third = second;
        second = first;
      }
    }
    else {
      rising = false;
      rise_count = 0;
      digitalWrite(10, LOW);
    }
    before = last;
    ptr++;
    ptr %= samp_siz;
  }
}
void temperature_reading(){

  delay(dht.getMinimumSamplingPeriod());
  float temperature = dht.getTemperature();
  Serial.print(dht.getStatusString());
  Serial.print("\t");
  Serial.print(temperature, 1);
  unsigned long currentTime = millis() / 1000;
  String data = "{\"value\": " + String(temperature) + ", \"timestamp\": " + String(currentTime) + "}";
  Serial.println(data);
   //firebase.pushString("temp", data);
  firebase.pushFloat("temp", temperature);
}

