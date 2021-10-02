variable "do_token" {}
variable "do_ssh_user" {}
variable "do_ssh_key_name" {}
variable "ssh_private_key" {}

terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.12.1"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

data "digitalocean_ssh_key" "terraform" {
  name = var.do_ssh_key_name
}

resource "digitalocean_droplet" "docker-host" {
  image              = "ubuntu-20-04-x64"
  name               = "docker-host"
  region             = "sfo3"
  size               = "s-1vcpu-1gb"
  private_networking = true
  ssh_keys           = [data.digitalocean_ssh_key.terraform.id]

  connection {
    type        = "ssh"
    user        = var.do_ssh_user
    host        = self.ipv4_address
    private_key = file(var.ssh_private_key)
    timeout     = "2m"
  }

  provisioner "remote-exec" {
    inline = [
      "sleep 20",
      "echo 'Ready to envoke `local-exec` provisioner'"
    ]
  }

  provisioner "local-exec" {
    command = "ANSIBLE_HOST_KEY_CHECKING=false ansible-playbook -i ${self.ipv4_address}, provision.yml -u ${var.do_ssh_user}"
  }
}
