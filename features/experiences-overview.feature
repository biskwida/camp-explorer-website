Feature: Experiences overview page lists every available trip
  Visitors arriving on /experiences should see all current trips with
  links to each detail page, in both English and Arabic.

  Scenario: English overview renders all 3 experience cards
    Given I visit the "experiences" page in "en"
    Then I see the headline contains "Choose your expedition"
    And the document direction is "ltr"
    And the document language is "en"
    And I see a link to "/en/experiences/sri-lanka"
    And I see a link to "/en/experiences/cambodia"
    And I see a link to "/en/experiences/weekend-camp"

  Scenario: Arabic overview renders RTL with translated headline
    Given I visit the "experiences" page in "ar"
    Then the document direction is "rtl"
    And the document language is "ar"
    And I see a link to "/ar/experiences/sri-lanka"
    And I see a link to "/ar/experiences/cambodia"
    And I see a link to "/ar/experiences/weekend-camp"
