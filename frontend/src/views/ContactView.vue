<template>
  <div class="contact">
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title">Nous contacter</h1>
        <p class="page-subtitle">
          Une question ? Envie de nous rejoindre ? N'hésitez pas à nous contacter
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="contact-layout">
          <div class="contact-info">
            <h2>Informations de contact</h2>
            <p>
              Nous sommes à votre disposition pour répondre à toutes vos questions concernant
              l'association, nos événements ou simplement pour discuter de Magic !
            </p>

            <div class="info-items">
              <div class="info-item-card">
                <div class="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h3>Email</h3>
                  <p>contact@mtgpau.fr</p>
                </div>
              </div>

              <div class="info-item-card">
                <div class="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h3>Localisation</h3>
                  <p>Pau, France</p>
                </div>
              </div>

              <div class="info-item-card">
                <div class="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3>Disponibilité</h3>
                  <p>Nous répondons généralement sous 24-48h</p>
                </div>
              </div>
            </div>

            <div class="join-section">
              <h2>Rejoindre l'association</h2>
              <p>
                Vous souhaitez devenir membre de MTG Pau ? L'adhésion est ouverte à tous les
                passionnés de Magic: The Gathering, quel que soit votre niveau.
              </p>
              <ul class="benefits-list">
                <li>Accès à tous nos événements</li>
                <li>Tarifs préférentiels sur les tournois</li>
                <li>Participation à la vie de l'association</li>
                <li>Échanges et prêts de cartes entre membres</li>
              </ul>
              <p>
                Pour adhérer, contactez-nous par email à l'adresse ci-dessus.
              </p>
            </div>
          </div>

          <div class="contact-form-container">
            <div class="form-card">
              <h2>Envoyez-nous un message</h2>
              <form @submit.prevent="handleSubmit" class="contact-form">
                <div class="form-group">
                  <label for="name">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    v-model="formData.name"
                    required
                    class="form-input"
                    placeholder="Votre nom"
                  />
                </div>

                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    v-model="formData.email"
                    required
                    class="form-input"
                    placeholder="votre@email.com"
                  />
                </div>

                <div class="form-group">
                  <label for="subject">Sujet</label>
                  <select
                    id="subject"
                    v-model="formData.subject"
                    required
                    class="form-input"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="adhesion">Adhésion</option>
                    <option value="evenements">Événements</option>
                    <option value="information">Information générale</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea
                    id="message"
                    v-model="formData.message"
                    required
                    class="form-input form-textarea"
                    rows="6"
                    placeholder="Votre message..."
                  ></textarea>
                </div>

                <div class="form-notice">
                  <p>
                    Note : Ce formulaire est actuellement en démonstration. Pour nous contacter,
                    envoyez un email à <strong>contact@mtgpau.fr</strong>
                  </p>
                </div>

                <button type="submit" class="btn btn-primary btn-full">
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const handleSubmit = () => {
  alert('Ce formulaire est en démonstration. Veuillez envoyer un email à contact@mtgpau.fr')
}
</script>

<style scoped>
.contact {
  width: 100%;
}

.page-hero {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-brown) 100%);
  color: var(--color-text-on-primary);
  padding: 5rem 2rem;
  text-align: center;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--color-white);
}

.page-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.95);
  max-width: 700px;
  margin: 0 auto;
}

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.contact-info h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.contact-info p {
  color: var(--color-text-soft);
  line-height: 1.8;
  margin-bottom: 2rem;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.info-item-card {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: var(--color-background-soft);
  border-radius: 0.75rem;
  border: 1px solid var(--color-border);
}

.info-icon {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
}

.info-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.info-item-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.info-item-card p {
  color: var(--color-text-soft);
  margin: 0;
}

.join-section {
  padding: 2rem;
  background-color: var(--color-background-soft);
  border-radius: 1rem;
  border: 2px solid var(--color-border);
}

.join-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.benefits-list li {
  padding: 0.5rem 0 0.5rem 2rem;
  position: relative;
  color: var(--color-text-soft);
}

.benefits-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-primary);
  font-weight: 700;
  font-size: 1.125rem;
}

.form-card {
  background-color: var(--color-white);
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-lg);
  position: sticky;
  top: 5rem;
}

.form-card h2 {
  font-size: 1.75rem;
  margin-bottom: 2rem;
  color: var(--color-text);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: var(--color-text);
  font-size: 0.9375rem;
}

.form-input {
  padding: 0.875rem 1rem;
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all var(--transition-fast);
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-notice {
  padding: 1rem;
  background-color: var(--color-background-soft);
  border-radius: 0.5rem;
  border-left: 4px solid var(--color-primary);
}

.form-notice p {
  color: var(--color-text-soft);
  font-size: 0.875rem;
  margin: 0;
}

.btn-full {
  width: 100%;
}

@media (max-width: 1024px) {
  .contact-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .form-card {
    position: relative;
    top: 0;
  }
}

@media (max-width: 768px) {
  .page-hero {
    padding: 4rem 1.5rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .page-subtitle {
    font-size: 1.125rem;
  }

  .form-card {
    padding: 2rem 1.5rem;
  }

  .join-section {
    padding: 1.5rem;
  }
}
</style>
