Feature: About page tells the Camp Explorer story
  Visitors arriving on /about should understand the mission, meet the founder
  Abdul Explorer, see the philosophy, and find a clear path to register interest.

  Scenario: English about page renders the brand statement and all sections
    Given I visit the "about" page in "en"
    Then I see the headline contains "More than experiences"
    And the document direction is "ltr"
    And the document language is "en"
    And I see a section titled "Who we are"
    And I see a section titled "Our philosophy"
    And I see a section titled "Meet the founder"
    And I see a link with text "Register Your Interest"

  Scenario: Arabic about page renders mirrored with translated content
    Given I visit the "about" page in "ar"
    Then I see the headline contains "أكثر من تجارب"
    And the document direction is "rtl"
    And the document language is "ar"
    And I see a link with text "سجل اهتمامك"
