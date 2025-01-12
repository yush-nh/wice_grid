# encoding: utf-8
require File.expand_path('../boot', __FILE__)

# We don't have our own Gemfile, make sure these things are loaded.
require 'rails/all'
require 'sprockets/railtie'
require 'haml'
require 'coderay'
require 'bootstrap'
require 'dartsass-rails'
require 'font-awesome-sass'
require 'importmap-rails'
require 'jquery-rails'
require 'jquery-ui-rails'
require 'jquery-ui-themes'
require "stimulus-rails"
require 'turbo-rails'

require_relative '../../../../lib/wice_grid'

module Examples
  class TestApp < Rails::Application
    config.load_defaults 7.1

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Custom directories with classes and modules you want to be autoloadable.
    # config.autoload_paths += %W(#{config.root}/extras)

    # Only load the plugins named here, in the order given (default is alphabetical).
    # :all can be used as a placeholder for all plugins not explicitly named.
    # config.plugins = [ :exception_notification, :ssl_requirement, :all ]

    # Activate observers that should always be running.
    # config.active_record.observers = :cacher, :garbage_collector, :forum_observer

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # Configure the default encoding used in templates for Ruby 1.9.
    config.encoding = 'utf-8'

    # Configure sensitive parameters which will be filtered from the log file.
    config.filter_parameters += [:password]

    # Use SQL instead of Active Record's schema dumper when creating the database.
    # This is necessary if your schema can't be completely dumped by the schema dumper,
    # like if you have constraints or database-specific column types
    # config.active_record.schema_format = :sql

    # Enforce whitelist mode for mass assignment.
    # This will create an empty whitelist of attributes available for mass-assignment for all models
    # in your app. As such, your models will need to explicitly whitelist or blacklist accessible
    # parameters by using an attr_accessible or attr_protected declaration.
    # config.active_record.whitelist_attributes = true

    # Enable the asset pipeline
    config.assets.enabled = true

    # Version of your assets, change this if you want to expire all your assets
    config.assets.version = '1.0'

    config.assets.initialize_on_precompile = false
    I18n.enforce_available_locales = false

    # Rails 5.2+
    config.active_record.sqlite3.represent_boolean_as_integer = true if config.active_record.sqlite3

    config.active_record.default_column_serializer = YAML
    config.active_record.yaml_column_permitted_classes = [
      ActionController::Parameters,
      ActiveSupport::HashWithIndifferentAccess,
    ]

    config.dartsass.build_options = '--style=expanded --embed-source-map'
  end
end
