const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    companyName: {
      type: String,
      trim: true
    },
    companyLogo: {
      type: String
    },
    sector: {
      type: String,
      enum: [
        'transport',
        'logistique',
        'tourisme',
        'hotellerie',
        'commerce',
        'services',
        'industrie',
        'autre'
      ],
      default: 'autre'
    },
    companyAddress: {
      type: String,
      trim: true
    },
    companyCity: {
      type: String,
      trim: true
    },
    companyDescription: {
      type: String,
      trim: true,
      maxlength: 500
    },
    website: {
      type: String,
      trim: true
    },
    siret: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'suspended'],
      default: 'approved'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    // Statistiques
    totalOffers: {
      type: Number,
      default: 0
    },
    activeOffers: {
      type: Number,
      default: 0
    },
    totalHires: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Index pour améliorer les performances
employerSchema.index({ userId: 1 });
employerSchema.index({ email: 1 });
employerSchema.index({ status: 1 });
employerSchema.index({ companyName: 1 });

// Méthode virtuelle pour le nom complet
employerSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('Employer', employerSchema);
