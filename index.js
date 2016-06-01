/**
* Created by Bruno Sampaio Pinho da Silva
* On May 31st, 2016
*/

"use strict";

var fs = require('fs');
var colors = require('colors');
var moment = require('moment');
const Console = require('console').Console;

var LogMadeSimple = function () {
  var self = this;

  self.label = "";
  self.outputFile = true;
  self.debugMode = true;
  self.initTime = moment();


  var output = fs.createWriteStream('./stdout.' + moment().format('MMMM-Do-YYYY') + '.log', { flags: 'a' });
  var logger = new Console(output);  

  // change file name after midnight
  var updateLogFile = function () {
    fs.close(output.fd);
    output = fs.createWriteStream('./stdout.' + moment().format('MMMM-Do-YYYY') + '.log', { flags: 'a' });
    logger = new Console(output);      
  }

  // check if it's another day
  var checkNewDay = function () {
    if (moment().isAfter(self.initTime, 'day') ) {
      self.initTime = moment();
      setTimeout(updateLogFile, 500);
    }
  };  

  return {
    setLabel: function (label) {
      if (!label) 
        self.label = "";
      else 
        self.label = label;
    },
    setDebugMode: function (d) {
      if (typeof d == 'undefined') self.debugMode = false;
      else {
        self.debugMode = d;
      }
    },
    setOutputFile: function (d) {
      if (typeof d == 'undefined') self.outputFile = false;
      else {
        self.outputFile = d;
      }
    },
    info: function (msg, ...params) {
      checkNewDay();
      
      if (self.outputFile)
        logger.log("[INFO] " + (self.label != "" ? "[" + self.label + "] " : "") + moment().format("MMMM Do YYYY, h:mm:ss a") + ': ' + msg, ...params);
      if (self.debugMode)
        console.log("[INFO] ".bold.green + (self.label != "" ? "[" + self.label + "] " : "") + moment().format("MMMM Do YYYY, h:mm:ss a") + ': ' + msg, ...params);      
    },
    warn: function (msg, ...params) {
      checkNewDay();      
      
      if (self.outputFile)
        logger.log("[WARNING] " + (self.label != "" ? "[" + self.label + "] " : "") + moment().format("MMMM Do YYYY, h:mm:ss a") + ': ' + msg, ...params);
      if (self.debugMode)
        console.log("[WARNING] ".bold.magenta + (self.label != "" ? "[" + self.label + "] " : "") + moment().format("MMMM Do YYYY, h:mm:ss a") + ': ' + msg, ...params);
      checkNewDay();
    },
    error: function (msg, ...params) {
      checkNewDay();
      
      if (self.outputFile)
        logger.log("[ERROR] " + (self.label != "" ? "[" + self.label + "] " : "") + moment().format("MMMM Do YYYY, h:mm:ss a") + ': ' + msg, ...params);
      if (self.debugMode)
      console.log("[ERROR] ".bold.red + (self.label != "" ? "[" + self.label + "] " : "") + moment().format("MMMM Do YYYY, h:mm:ss a") + ': ' + msg, ...params);
    },
    debug: function (msg, ...params) {
      checkNewDay();
      
      if (self.outputFile)
        logger.log("[DEBUG] " + (self.label != "" ? "[" + self.label + "] " : "") + moment().format("MMMM Do YYYY, h:mm:ss a") + ': ' + msg, ...params);
      if (self.debugMode)
        console.log("[DEBUG] ".bold.cyan + (self.label != "" ? "[" + self.label + "] " : "") + moment().format("MMMM Do YYYY, h:mm:ss a") + ': ' + msg, ...params);
    }
  };
};


var logSimple = new LogMadeSimple();

module.exports = logSimple;
