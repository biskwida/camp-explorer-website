Feature: Experience detail pages render full content for both countries
  Visitors arriving on /experiences/sri-lanka or /experiences/cambodia should
  see the hero, overview, activities, timeline, highlights, Abdul block,
  safety, and who-it's-for sections, with a working register CTA.

  Scenario: Sri Lanka detail page renders all sections in English
    Given I visit the "experiences/sri-lanka" page in "en"
    Then I see the headline contains "Turtle Conservation"
    And the document direction is "ltr"
    And the document language is "en"
    And I see a section titled "Program Overview"
    And I see a section titled "What Participants Will Do"
    And I see a section titled "Program Structure"
    And I see a section titled "Key Highlights"
    And I see a section titled "Abdul Explorer Experience"
    And I see a section titled "Safety & Structure"
    And I see a section titled "Who It's For"
    And I see a link with text "Register your interest"

  Scenario: Cambodia detail page renders all sections in English
    Given I visit the "experiences/cambodia" page in "en"
    Then I see the headline contains "Elephant Conservation"
    And the document direction is "ltr"
    And the document language is "en"
    And I see a section titled "Program Overview"
    And I see a section titled "What Participants Will Do"
    And I see a section titled "Program Structure"
    And I see a section titled "Key Highlights"
    And I see a section titled "Abdul Explorer Experience"
    And I see a section titled "Safety & Structure"
    And I see a section titled "Who It's For"
    And I see a link with text "Register your interest"

  Scenario: Sri Lanka renders in Arabic with RTL layout
    Given I visit the "experiences/sri-lanka" page in "ar"
    Then the document direction is "rtl"
    And the document language is "ar"
