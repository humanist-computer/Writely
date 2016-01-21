# encoding: utf-8
# This file originally created at http://rove.io/b55f76a5466f2527b0cb3308f1054d01

# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = "opscode-ubuntu-12.04_chef-11.4.0"
  config.vm.box_url = "https://opscode-vm-bento.s3.amazonaws.com/vagrant/opscode_ubuntu-12.04_chef-11.4.0.box"
  config.ssh.forward_agent = true

  config.vm.network :forwarded_port, guest: 4567, host: 4567

  config.vm.provision :chef_solo do |chef|
    chef.cookbooks_path = ["cookbooks"]
    chef.add_recipe :apt
    chef.add_recipe 'rvm::vagrant'
    chef.add_recipe 'nodejs'
    chef.add_recipe 'rvm::system'
    chef.add_recipe 'vim'
    chef.add_recipe 'apache2'
    chef.add_recipe 'git'
    chef.add_recipe 'sqlite'
    chef.json = {
      :vim => {
        :extra_packages => [
          "vim-rails"
        ]
      },
      :apache => {
        :default_site_enabled => "true",
        :dir                  => "/etc/apache2",
        :log_dir              => "/var/log/apache2",
        :error_log            => "error.log",
        :user                 => "www-data",
        :group                => "www-data",
        :binary               => "/usr/sbin/apache2",
        :cache_dir            => "/var/cache/apache2",
        :pid_file             => "/var/run/apache2.pid",
        :lib_dir              => "/usr/lib/apache2",
        :listen_ports         => [
          "80"
        ],
        :contact              => "ops@example.com",
        :timeout              => "300",
        :keepalive            => "On",
        :keepaliverequests    => "100",
        :keepalivetimeout     => "5"
      },
      :git => {
        :prefix => "/usr/local"
      }
    }
  end
end
