Feature: Scaffold sanity check
  As a developer
  I want to verify the Next.js + i18n scaffold renders both locales
  So that I know the foundation is solid before building features

  Scenario: English home page renders the brand statement
    Given I visit the home page in "en"
    Then I see the headline contains "Be Your Own"
    And the document direction is "ltr"
    And the document language is "en"

  Scenario: Arabic home page renders mirrored
    Given I visit the home page in "ar"
    Then I see the headline contains "كن مستكشفك"
    And the document direction is "rtl"
    And the document language is "ar"
