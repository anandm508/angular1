'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('calculator', function() {


  it('should automatically redirect to /linearMotionCalc when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/linearMotionCalc");
  });


  describe('linearMotionCalc', function() {

    beforeEach(function() {
      browser.get('index.html#!/linearMotionCalc');
    });


    it('should render linearMotionCalc when user navigates to /linearMotionCalc', function() {
      expect(element.all(by.id('page_header_label')).first().getText()).
        toEqual('Linear Motion Calculator');
    });

  });


});
