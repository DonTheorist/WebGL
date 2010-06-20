/*
 * Copyright (c) 2009 The Chromium Authors. All rights reserved.
 * Copyright (C) 2009 Apple Computer, Inc.  All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *    * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *    * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

description("Verifies the functionality of the new array-like objects in the WebGL spec");

var currentlyRunning = '';
var allPassed = true;
function running(str) {
  currentlyRunning = str;
}

function output(str) {
  debug(str);
}

function pass() {
  testPassed(currentlyRunning);
}

function fail(str) {
  allPassed = false;
  var exc;
  if (str)
    exc = currentlyRunning + ': ' + str;
  else
    exc = str;
  testFailed(exc);
}

function assertEq(prefix, expected, val) {
  if (expected != val) {
    var str = prefix + ': expected ' + expected + ', got ' + val;
    throw str;
  }
}

function assert(prefix, expected) {
  if (!expected) {
    var str = prefix + ': expected value / true';
    throw str;
  }
}

function printSummary() {
  if (allPassed) {
    debug("Test passed.");
  } else {
    debug("TEST FAILED");
  }
}

//
// Tests for unsigned array variants
//

function testSetAndGet10To1(type, name) {
  running('test ' + name + ' SetAndGet10To1');
  try {
    var array = new type(10);
    for (var i = 0; i < 10; i++) {
      array[i] = 10 - i;
    }
    for (var i = 0; i < 10; i++) {
      assertEq('Element ' + i, 10 - i, array[i]);
    }
    pass();
  } catch (e) {
    fail(e);
  }
}

function testSetAndGetMethods10To1(type, name) {
  running('test ' + name + ' SetAndGetMethods10To1');
  try {
    var array = new type(10);
    for (var i = 0; i < 10; i++) {
      array.set(i, 10 - i);
    }
    for (var i = 0; i < 10; i++) {
      assertEq('Element ' + i, 10 - i, array.get(i));
    }
    pass();
  } catch (e) {
    fail(e);
  }
}

function testConstructWithArrayOfUnsignedValues(type, name) {
  running('test ' + name + ' ConstructWithArrayOfUnsignedValues');
  try {
    var array = new type([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
    assertEq('Array length', 10, array.length);
    for (var i = 0; i < 10; i++) {
      assertEq('Element ' + i, 10 - i, array[i]);
    }
    pass();
  } catch (e) {
    fail(e);
  }
}

function testConstructWithWebGLArrayOfUnsignedValues(type, name) {
  running('test ' + name + ' ConstructWithWebGLArrayOfUnsignedValues');
  try {
    var tmp = new type([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
    var array = new type(tmp);
    assertEq('Array length', 10, array.length);
    for (var i = 0; i < 10; i++) {
      assertEq('Element ' + i, 10 - i, array[i]);
    }
    pass();
  } catch (e) {
    fail(e);
  }
}

//
// Tests for signed array variants
//

function testSetAndGetPos10ToNeg10(type, name) {
  running('test ' + name + ' SetAndGetPos10ToNeg10');
  try {
    var array = new type(21);
    for (var i = 0; i < 21; i++) {
      array[i] = 10 - i;
    }
    for (var i = 0; i < 21; i++) {
      assertEq('Element ' + i, 10 - i, array[i]);
    }
    pass();
  } catch (e) {
    fail(e);
  }
}

function testSetAndGetMethodsPos10ToNeg10(type, name) {
  running('test ' + name + ' SetAndGetMethodsPos10ToNeg10');
  try {
    var array = new type(21);
    for (var i = 0; i < 21; i++) {
      array.set(i, 10 - i);
    }
    for (var i = 0; i < 21; i++) {
      assertEq('Element ' + i, 10 - i, array.get(i));
    }
    pass();
  } catch (e) {
    fail(e);
  }
}

function testConstructWithArrayOfSignedValues(type, name) {
  running('test ' + name + ' ConstructWithArrayOfSignedValues');
  try {
    var array = new type([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10]);
    assertEq('Array length', 21, array.length);
    for (var i = 0; i < 21; i++) {
      assertEq('Element ' + i, 10 - i, array[i]);
    }
    pass();
  } catch (e) {
    fail(e);
  }
}

function testConstructWithWebGLArrayOfSignedValues(type, name) {
  running('test ' + name + ' ConstructWithWebGLArrayOfSignedValues');
  try {
    var tmp = new type([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10]);
    var array = new type(tmp);
    assertEq('Array length', 21, array.length);
    for (var i = 0; i < 21; i++) {
      assertEq('Element ' + i, 10 - i, array[i]);
    }
    pass();
  } catch (e) {
    fail(e);
  }
}

//
// Test cases for both signed and unsigned types
//

function testOffsetsAndSizes(type, name, elementSizeInBytes) {
  running('test ' + name + ' OffsetsAndSizes');
  try {
    var len = 10;
    var array = new type(len);
    assert('array.buffer', array.buffer);
    assertEq('array.byteOffset', array.byteOffset, 0);
    assertEq('array.length', array.length, len);
    assertEq('array.byteLength', array.byteLength, len * elementSizeInBytes);
    array = new type(array.buffer, elementSizeInBytes, len - 1);
    assert('array.buffer', array.buffer);
    assertEq('array.byteOffset', array.byteOffset, elementSizeInBytes);
    assertEq('array.length', array.length, len - 1);
    assertEq('array.byteLength', array.byteLength, (len - 1) * elementSizeInBytes);
    pass();
  } catch (e) {
    fail(e);
  }
}

function testSetFromWebGLArray(type, name) {
  running('test ' + name + ' SetFromWebGLArray');
  try {
    var array = new type(10);
    var array2 = new type(5);
    for (var i = 0; i < 10; i++) {
      assertEq('Element ' + i, 0, array[i]);
    }
    for (var i = 0; i < array2.length; i++) {
      array2[i] = i;
    }
    array.set(array2);
    for (var i = 0; i < array2.length; i++) {
      assertEq('Element ' + i, i, array[i]);
    }
    array.set(array2, 5);
    for (var i = 0; i < array2.length; i++) {
      assertEq('Element ' + i, i, array[5 + i]);
    }
    pass();
  } catch (e) {
    fail(e);
  }
}

function negativeTestSetFromWebGLArray(type, name) {
  running('negativeTest ' + name + ' SetFromWebGLArray');
  try {
    var array = new type(5);
    var array2 = new type(6);
    for (var i = 0; i < 5; i++) {
      assertEq('Element ' + i, 0, array[i]);
    }
    for (var i = 0; i < array2.length; i++) {
      array2[i] = i;
    }
    try {
      array.set(array2);
      fail('Expected exception from array.set(array2)');
      return;
    } catch (e) {
    }
    try {
      array2.set(array, 2);
      fail('Expected exception from array2.set(array, 2)');
      return;
    } catch (e) {
    }
    pass();
  } catch (e) {
    fail(e);
  }
}

function testSetFromArray(type, name) {
  running('test ' + name + ' SetFromArray');
  try {
    var array = new type(10);
    var array2 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    for (var i = 0; i < 10; i++) {
      assertEq('Element ' + i, 0, array[i]);
    }
    array.set(array2, 0);
    for (var i = 0; i < array2.length; i++) {
      assertEq('Element ' + i, 10 - i, array[i]);
    }
    pass();
  } catch (e) {
    fail(e);
  }
}

function testSlice(type, name) {
  running('test ' + name + ' Slice');
  try {
    var array = new type([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    var slice = array.slice(0, 5);
    assertEq('slice.length', 5, slice.length);
    for (var i = 0; i < 5; i++) {
      assertEq('Element ' + i, i, slice[i]);
    }
    slice = array.slice(4, 6);
    assertEq('slice.length', 6, slice.length);
    for (var i = 0; i < 6; i++) {
      assertEq('Element ' + i, 4 + i, slice[i]);
    }
    pass();
  } catch (e) {
    fail(e);
  }
}

function negativeTestSlice(type, name) {
  running('negativeTest ' + name + ' Slice');
  try {
    var array = new type([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    slice = array.slice(5, 6);
    if (slice) {
      fail();
      return;
    }
    slice = array.slice(10, 0);
    if (slice) {
      fail();
      return;
    }
    pass();
  } catch (e) {
    pass();
  }
}

function testBoundaryConditions(type, name, lowValue, expectedLowValue, highValue, expectedHighValue) {
  running('test ' + name + ' BoundaryConditions(' +
          lowValue + ', ' + expectedLowValue + ', ' +
          highValue + ', ' + expectedHighValue + ')');
  try {
    var array = new type(1);
    assertEq('Array length', 1, array.length);
    array[0] = lowValue;
    assertEq('Element 0', expectedLowValue, array[0]);
    array[0] = highValue;
    assertEq('Element 0', expectedHighValue, array[0]);
    pass();
  } catch (e) {
    fail(e);
  }
}

//
// Test driver
//

function runTests() {
  allPassed = true;

  // The "name" attribute is a concession to browsers which don't
  // implement the "name" property on function objects
  var testCases =
    [ {name: "Int8Array",
       unsigned: false,
       elementSizeInBytes: 1,
       low: -128,
       expectedLow: -128,
       high: 127,
       expectedHigh: 127},
      {name: "Float32Array",
       unsigned: false,
       elementSizeInBytes: 4,
       low: -500,
       expectedLow: -500,
       high: 500,
       expectedHigh: 500},
      {name: "Int32Array",
       unsigned: false,
       elementSizeInBytes: 4,
       low: -2147483648,
       expectedLow: -2147483648,
       high: 2147483647,
       expectedHigh: 2147483647},
      {name: "Int16Array",
       unsigned: false,
       elementSizeInBytes: 2,
       low: -32768,
       expectedLow: -32768,
       high: 32767,
       expectedHigh: 32767},
      {name: "Uint8Array",
       unsigned: true,
       elementSizeInBytes: 1,
       low: 0,
       expectedLow: 0,
       high: 255,
       expectedHigh: 255},
      {name: "Uint32Array",
       unsigned: true,
       elementSizeInBytes: 4,
       low: 0,
       expectedLow: 0,
       high: 4294967295,
       expectedHigh: 4294967295},
      {name: "Uint16Array",
       unsigned: true,
       elementSizeInBytes: 2,
       low: 0,
       expectedLow: 0,
       high: 65535,
       expectedHigh: 65535} ];

  for (var i = 0; i < testCases.length; i++) {
    var testCase = testCases[i];
    running(testCase.name);
    if (!(testCase.name in window)) {
        fail("does not exist");
        continue;
    }
    var type = window[testCase.name];
    var name = testCase.name;
    if (testCase.unsigned) {
      testSetAndGet10To1(type, name);
      testSetAndGetMethods10To1(type, name);
      testConstructWithArrayOfUnsignedValues(type, name);
      testConstructWithWebGLArrayOfUnsignedValues(type, name);
    } else {
      testSetAndGetPos10ToNeg10(type, name);
      testSetAndGetMethodsPos10ToNeg10(type, name);
      testConstructWithArrayOfSignedValues(type, name);
      testConstructWithWebGLArrayOfSignedValues(type, name);
    }
    testOffsetsAndSizes(type, name, testCase.elementSizeInBytes);
    testSetFromWebGLArray(type, name);
    negativeTestSetFromWebGLArray(type, name);
    testSetFromArray(type, name);
    testSlice(type, name);
    negativeTestSlice(type, name);
    testBoundaryConditions(type,
                           name,
                           testCase.low,
                           testCase.expectedLow,
                           testCase.high,
                           testCase.expectedHigh);
  }

  printSummary();
}

runTests();
successfullyParsed = true;